# Qwen3 Embedding

Serves `qwen3-embedding:0.6b` through Ollama for retrieval, clustering and semantic search.
It produces vectors only; it does not generate text.

Ollama listens on 11435 and exposes both its own `/api/embed` and an OpenAI-compatible
`/v1/embeddings`. The model is pulled as a resource, so the container starts with the
weights already on the node.

At 0.6B the weights are well under a gigabyte, which is why the declared VRAM is low
enough for any GPU market.

This is a self-hosted deployment: the endpoint it publishes is open to anyone who has the
URL. It is not part of the managed LLM Gateway, which serves chat models behind Nosana API
keys and per-token billing.
