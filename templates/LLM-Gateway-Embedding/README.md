# Managed embedding inference

Internal gateway template serving Nemotron-3-Embed-1B on vLLM. Client-manager injects the
shared `VLLM_API_KEY` and creates a confidential INFINITE deployment only after an
administrator enables a priced model on an approved market. Importing this template does
not start a deployment.

Vectors are 2048-dimensional and L2 normalised. They are Matryoshka, so truncating to 1024,
512 or 256 and renormalising keeps the ranking: measured on a live deployment, retrieval
margins held at 0.39, 0.40 and 0.35 against 0.39 at full width.

## Prefixes

Queries take a `query: ` prefix and documents a `passage: ` one. This is not cosmetic. On
the same four-document retrieval check the correct answer beat the runner-up by 0.39 with
the prefixes and 0.18 without, so omitting them halves the separation. `/v1/embeddings`
has no field for this, so callers prepend the prefix themselves.

## Pooling

The model needs mean pooling. vLLM defaults this family to another pooling and starts
perfectly well with it, returning vectors that still rank correctly but with the margin cut
to 0.24 — a quality regression with no error to notice it by.

Mean pooling comes from `1_Pooling/config.json`, which is why there are two HF resources.
The fetcher flattens paths into the target directory, so requesting `1_Pooling/config.json`
alongside `config.json` writes both to the same name and one silently overwrites the other;
when the pooling file wins, the model config is gone and vLLM exits with `Unrecognized
model ... should have a model_type key`. Giving the second resource the `1_Pooling`
directory as its own target makes the flattening land the file exactly where
sentence-transformers looks for it.

Do not fold these back into one resource, and do not pass `--pooler-config` instead: the
catalog validator locates flags by scanning the `cmd` array, so the JSON argument that
would need a shell to survive quoting cannot be used here.
