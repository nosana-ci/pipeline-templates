# Managed Nemotron inference

Internal gateway template serving Nemotron 3.5 Lightning 30B A3B on vLLM with DSpark
speculative decoding. Like the other gateway templates, importing it does not start a
deployment: an administrator enables a priced model on an approved market and
client-manager creates the deployment.

A hybrid Mixture-of-Experts model — interleaved Mamba-2 and MoE layers with a few attention
layers — with 30B total and **3B active** parameters. The active count sets decode speed, so
it behaves like a much smaller model under load.

## What the card is spent on

The NVFP4 weights are 20.1 GiB and the draft another 1.26, so on a 96 GB card the model is a
small part of what is resident. The rest goes to KV and Mamba state: this configuration buys
**concurrency and context**, not a larger model.

That is a deliberate choice rather than an oversight. The models that would fill this card at
four bits — `gpt-oss-120b`, `GLM-4.5-Air` — were both published in mid-2025 and have not been
updated since, while everything current in the 300B+ class needs more than one card. The
100–130B band has largely been abandoned.

## Why NVFP4

NVIDIA publishes BF16 and NVFP4 and no FP8. The BF16 repository is 61.3 GiB and its card
states it is a starting point for customization rather than for serving; NVFP4 is what NVIDIA
points at for this card, and it is the only build the DSpark draft is published against.

`--moe-backend marlin` is what the NVFP4 card specifies for the quantized experts, and
`--kv-cache-dtype fp8` halves the attention cache.

## Speculative decoding

The draft is passed as individual `--speculative_config.*` keys, never as one JSON value.
The node parses any argument that begins with `{` or `[` into an object before handing the
command to podman, which then refuses the job with `cannot unmarshal object into Go struct
field SpecGenerator.command of type string`. The same applies to any flag here that takes
JSON. The draft is a 0.76B DSpark head that reads hidden states from target layers
`[1, 5, 19, 29, 41, 51]`; it is fetched as a second HF resource because vLLM loads it as a
model in its own right.

`num_speculative_tokens` is 3, the figure NVIDIA gives for a single data-centre card. Higher
values pay off only when the card is otherwise idle: every rejected token is work thrown
away, so the gain shrinks as concurrency rises.

## Mamba layers

This is not a plain transformer. `--mamba-backend flashinfer` replaces the default Triton
path and `--mamba-cache-mode align` is what the model card asks for. Recurrent state is held
per sequence rather than per token, so `--max-num-seqs` bounds memory far more directly than
on an attention-only model; 128 is the card's own figure.

## Context

262,144, which is what every endpoint in this model's field advertises — matching them keeps
the listing comparable on a specification buyers read directly. The model itself is validated
to 1M.

The cache makes this cheap. With six attention layers and an fp8 KV cache the model spends
**3 KiB per token**, against 47 MiB of Mamba state per *sequence* that does not grow with
context at all. A full-length sequence is therefore about 815 MiB, and the roughly 57 GiB left
after weights holds, by vLLM's own count, about 55 of them: it reports 14.4M tokens of KV
capacity. Hybrid block alignment under `--mamba-cache-mode align` and the draft's own
overhead take a share that a per-layer estimate misses.

`--max-num-seqs` stays at 128 even though only ~55 full-length sequences fit: it caps the
scheduler, not the cache, and real prompts are far shorter than the advertised maximum. It is
meant to be set from a measured sweep rather than from this arithmetic.

What the number really costs is credit, not memory. The gateway reserves
`context_length x prompt_price` before every request, so quadrupling the context quadruples
what a one-line prompt holds. That is the reason to revisit it, and the reason the figure is
worth re-deciding alongside the price rather than on its own.

`--enable-prefix-caching` matters more than the context number for agent traffic, which
resends a long identical prefix every turn.

## Parsers

`nemotron_v3` splits the reasoning block into `reasoning_content`; without it the thinking
text lands inline and every answer looks broken. `qwen3_coder` parses tool calls, and
`--enable-auto-tool-choice` is required for the model to emit them.

Both were checked against the pinned image rather than the model card: `nemotron_v3` is
registered in vLLM's reasoning package, and `marlin`, `flashinfer` and `align` are valid
values of their enums in v0.27.1.
