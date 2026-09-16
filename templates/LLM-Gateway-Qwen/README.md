# Managed Qwen inference

Internal gateway template serving Qwen3.8-27B on vLLM. Client-manager injects the shared
`VLLM_API_KEY` and creates a confidential INFINITE deployment only after an administrator
enables a priced model on an approved market. Importing this template does not start a
deployment.

## Sizing

The AWQ INT4 weights are 19.6 GiB, so the card must have 32 GB: an RTX 5090 fits, a 24 GB
card does not hold the weights at any utilization.

`--gpu-memory-utilization` is what is left for the KV cache after the weights, and vLLM
refuses to start when the cache cannot hold a single sequence of `--max-model-len`. At
fp8 this model spends 128 KiB per token, so 32,768 tokens is 4 GiB for one sequence:

    0.90 x 32 GiB - 19.6 GiB weights - activations  ~= 7 GiB of cache

That is the reason for 0.90 rather than the 0.80 the model card suggests — 0.80 leaves
under 4 GiB and the server exits during startup. It also means the node must have the card
to itself, because vLLM compares the utilization against *free* VRAM, not total.

Cache is paged, so `--max-num-seqs 16` is a scheduler cap rather than a reservation:
sixteen short conversations fit comfortably, while sixteen full-length ones do not and are
queued.

## Parsers

`qwen3` splits the `<think>` block into `reasoning_content`; it handles the missing opening
tag, which the chat template supplies rather than the model. `qwen3_xml` parses tool calls,
and `--enable-auto-tool-choice` is required for the model to emit them.

The model is multimodal. `--mm-encoder-attn-backend TORCH_SDPA` selects the encoder
attention backend that its own model card specifies.

The declared `vram_total_mb` is 32000 rather than 32768: a 32 GB card reports about
32607 MiB once the firmware reserve is taken off, so the nominal figure is above every
card it is meant to match.

The image is newer than the `vllm-openai` build the 5090 markets pre-pull, so the first
start on a node includes the image download.
