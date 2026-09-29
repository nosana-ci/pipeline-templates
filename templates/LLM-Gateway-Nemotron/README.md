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

`--speculative-config` takes JSON, so the draft is passed as one argument rather than as
dotted keys. The draft is a 0.76B DSpark head that reads hidden states from target layers
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

Validated to 1M tokens, set here to 65,536. The gateway reserves
`context_length x prompt_price` before every request, so the advertised context is a floor
under every hold — a megatoken context would make a one-line prompt reserve more credit than
most callers hold. Raise it when a caller needs it, and reprice if so.

`--enable-prefix-caching` matters more than the context number for agent traffic, which
resends a long identical prefix every turn.

## Parsers

`nemotron_v3` splits the reasoning block into `reasoning_content`; without it the thinking
text lands inline and every answer looks broken. `qwen3_coder` parses tool calls, and
`--enable-auto-tool-choice` is required for the model to emit them.

Both were checked against the pinned image rather than the model card: `nemotron_v3` is
registered in vLLM's reasoning package, and `marlin`, `flashinfer` and `align` are valid
values of their enums in v0.27.1.
