# Managed Qwen inference

Internal gateway template, based on the benchmarked vLLM Qwen3.5-9B job.
Client-manager injects the shared `VLLM_API_KEY` and creates a confidential
INFINITE deployment only after an administrator enables a priced model on an
approved market. Importing this template does not start a deployment.

The declared 90 GiB VRAM requirement and 32,768 token context reflect the tested
configuration. Do not lower resource requirements without revalidating the job.
