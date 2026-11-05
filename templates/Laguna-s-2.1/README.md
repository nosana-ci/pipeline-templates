# Laguna S 2.1

Laguna S 2.1 is a large model for agentic coding and long-horizon work. Served through Ollama, this template deploys the `laguna-s-2.1:q4_k_m` weights — the highest-VRAM tier in the benchmark set.

## Included Model

### S 2.1 q4_k_m
- **Model Tag**: `laguna-s-2.1:q4_k_m`
- **Model Size**: 96 GB (q4_k_m quantization)
- **Context Length**: 32K tokens served (the model supports 256K)
- **Modalities**: Text
- **VRAM Required**: ~94 GB (96 GB GPUs such as the RTX PRO 6000, and up)
- **Use Case**: High-VRAM performance ceiling; agentic coding and long-horizon reasoning

## Highlights

- **q4_k_m quantization**: strong quality at a fraction of full-precision VRAM
- **Long context**: trained for 256K tokens; see Context length below
- **Tool + thinking ready**: designed for agentic coding assistants

## Context length

The template sets `OLLAMA_CONTEXT_LENGTH` through the `CONTEXT_LENGTH` global variable, default 32768. Without it, Ollama picks a 256K context on any GPU with 47 GiB or more, whose 12 GiB KV cache does not fit beside the 89 GiB of weights on a 96 GB card; llama.cpp then leaves part of the expert weights in system memory and generation runs on the CPU.

At 32K the KV cache takes 1.5 GiB and the whole model stays on the GPU. Raise the value only on cards with room to spare: each extra 1K tokens costs about 48 MiB.
