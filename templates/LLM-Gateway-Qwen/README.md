# Managed Qwen inference

Internal gateway template serving Qwen3.5-4B on vLLM. Client-manager injects the
shared `VLLM_API_KEY` and creates a confidential INFINITE deployment only after
an administrator enables a priced model on an approved market. Importing this
template does not start a deployment.

Sized for a 24 GB card that is not exclusively ours: vLLM refuses to start when
free VRAM is below `--gpu-memory-utilization` of the card's total, so the 0.75
setting leaves room for whatever else holds memory on the node. Within that
budget the 8.7 GiB of weights and the 2 GiB of KV cache for 16,384 tokens fit
with headroom. Raising the context or the utilization needs a node with the card
to itself.
