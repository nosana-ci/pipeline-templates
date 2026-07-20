# Laguna XS 2.1

Laguna XS 2.1 is a 33B total-parameter Mixture-of-Experts model with 3B activated parameters per token, designed for agentic coding and long-horizon work on a local machine. Served through Ollama, this template deploys the full-precision `laguna-xs-2.1:bf16` weights.

## Included Model

### XS 2.1 bf16
- **Model Tag**: `laguna-xs-2.1:bf16`
- **Model Size**: 67 GB (bf16, full precision)
- **Context Length**: 256K tokens
- **Modalities**: Text
- **VRAM Required**: ~72 GB (80 GB-class GPUs)
- **Use Case**: High-VRAM performance ceiling; agentic coding and long-horizon reasoning

## Highlights

- **MoE efficiency**: 33B total / 3B active parameters per token
- **Full precision**: bf16 weights for a top-end throughput reference
- **Long context**: 256K tokens
- **Tool + thinking ready**: Designed for agentic coding assistants
