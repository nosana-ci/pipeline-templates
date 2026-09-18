# Managed test inference

Internal gateway template serving Qwen3.5-0.8B on vLLM. It exists to exercise the gateway
end to end — catalog, routing, health, reservations, metering and settlement — on the
cheapest card the fleet offers, without the cost of a production-sized model. Like the
other gateway templates, importing it does not start a deployment: an administrator
enables a priced model on an approved market and client-manager creates the deployment.

The model is small enough that its answers are not the point. What it proves is that a
request reaches a node, bills correctly and comes back.

## Sizing

The bf16 weights are 1.63 GiB, so this fits the 8 GB tier with room to spare. The text
stack is 24 layers with 2 KV heads of 256 dimensions, which at bf16 is 48 KiB of KV cache
per token — a quarter of what a model with eight KV heads costs — so a full 8,192-token
sequence is only 384 MiB:

    0.60 x 8 GiB - 1.63 GiB weights - activations  ~= 2.8 GiB of cache

That is around seven full-length sequences, so `--max-num-seqs 8` is close to what the
cache actually holds rather than a cap that queues early.

`--language-model-only` skips the vision encoder and its multimodal profiling. The model
is multimodal, but nothing here sends images, and the flag returns that memory to the KV
cache. It also removes the encoder as a way for startup to fail on a small card.

The context is deliberately 8,192 rather than the 262,144 the model supports natively. The
gateway reserves `context_length x prompt_price` before every request, so a large context
on a cheap model makes each hold far larger than the call it is testing — which is itself
worth exercising, but not as the default.

## Parsers

None are configured. Tool calling would want `--enable-auto-tool-choice --tool-call-parser
qwen3_coder` per the model card, but it is not needed to prove the gateway works and every
parser flag is another way for the server to fail to start.

The chat template ships as `chat_template.jinja`, and the weights arrive as a single shard
named `model.safetensors-00001-of-00001.safetensors` with an index beside it. Both are
listed explicitly: an HF resource without `files` is sent to the fetcher with an empty
revision instead of `main`, and the job then fails with no operation state to explain it.

## Image

This pins `v0.27.1-cu129-ubuntu2404`, the same build the 27B gateway template uses. The
model card asks for vLLM from main, but that was written against the 3.5 release; the tag
pinned here is later and also serves Qwen3.8, a newer model in the same family. The image
is newer than the build most markets pre-pull, so the first start on a node includes the
image download.
