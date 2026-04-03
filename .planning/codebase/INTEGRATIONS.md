# External Integrations

**Analysis Date:** 2025-04-03

## APIs & External Services

**Model Serving APIs:**
- OpenAI-compatible API (via vLLM) - LLM inference endpoint (port 9000)
  - SDK/Client: `vllm/vllm-openai:v0.10.2` and `v0.17.0` Docker images
  - Health check: HTTP POST to `/v1/chat/completions` with JSON body

**AI Model Frameworks:**
- vLLM - Large Language Model serving for Deepseek-R1, Qwen3.5, Gemma3, and other LLM variants
- ComfyUI - Node-based image generation API (port 8188)
- Text Generation Inference (TGI) - Hugging Face's inference framework
- Ollama - LLM runtime for local model serving

**GitHub Integration:**
- GitHub URLs validated in `info.json` via URL fetch and 200 status check in `scripts/validate.js`
- GitHub Actions CI/CD workflow: `.github/workflows/validate.yml` runs validation on push/PR to main

## Data Storage

**Databases:**
- Not applicable - This is a template repository without persistent storage

**File Storage:**
- **Nosana Models S3 API:** `https://models.nosana.io` - Cloud S3-compatible endpoint for downloading AI model weights
  - Used by 20+ templates for model initialization
  - Examples:
    - `https://models.nosana.io/stable-diffusion/1.5` (AUTOMATIC1111, ComfyUI)
    - `https://models.nosana.io/stable-diffusion/sd-xl` (ComfyUI SDXL variant)
    - `https://models.nosana.io/flux/schnell` (ComfyUI Flux variant)
    - `https://models.nosana.io/hugging-face/deepseek/janus/models-deepseek-ai-Janus-Pro-1B` (Janus-Pro)
  - Resource type in job definitions: `"type": "S3"`
  - Target path: `/path/inside/container` (varies by template)
  - Protocol: HTTPS

**Caching:**
- None (models cached in container images or downloaded at runtime)

## Authentication & Identity

**Auth Provider:**
- Custom Nosana Network authentication
  - Implementation: Solana blockchain wallet integration via `@solana/web3.js` (in SDK)
  - Handled at dashboard/CLI level (outside scope of templates)
- No API keys required for template validation itself
- Some templates may require GitHub tokens for large asset downloads (not enforced in this repo)

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Container stdout/stderr captured by Nosana dashboard
- Health checks logged via HTTP response codes in expose health_checks

## CI/CD & Deployment

**Hosting:**
- GitHub-based repository with template distribution via GitHub
- Nosana Network dashboard for job submission and execution
- Template validation runs on GitHub Actions (ubuntu-latest)

**CI Pipeline:**
- **Trigger:** Push to main, Pull requests to main
- **Runner:** ubuntu-latest (GitHub Actions)
- **Steps:**
  1. Checkout code (`actions/checkout@v2`)
  2. Setup Node.js 20.x (`actions/setup-node@v2.1.4`)
  3. Cache npm dependencies (`actions/cache@v4`)
  4. Run `npm ci` (clean install)
  5. Run `npm run validate` - Validates all templates against Nosana schema
- **Validation includes:**
  - JSON format validation
  - info.json required fields (id, name, category)
  - job-definition.json schema validation via `@nosana/sdk`
  - Unique ID enforcement (max 16 chars, no dots)
  - Category validation against whitelist
  - GitHub URL reachability check (warns on failure, doesn't block)
  - Op ID validation (no dots)

**Image Registry:**
- Docker Hub (docker.io) - Primary registry for Nosana images
  - Prefix: `docker.io/nosana/` (images like `comfyui:2.0.5`, `vllm-openai:v0.10.2`)
- GitHub Container Registry (ghcr.io) - For community images
  - Examples: `ghcr.io/huggingface/text-generation-inference:2.3.1`, `ghcr.io/open-webui/open-webui:ollama`
- Hugging Face Registry (registry.hf.space) - For specialized images
  - Example: `registry.hf.space/openai-whisper:latest`

## Environment Configuration

**Required env vars:**
- No env vars required for template validation
- GPU access (implicit requirement, detected via job definition `"gpu": true`)
- VRAM requirements documented in `meta.system_requirements.required_vram`
- CUDA versions documented in `meta.system_requirements.required_cuda` (array of supported versions)

**Secrets location:**
- No secrets stored in this repository
- Nosana wallet credentials: Managed by CLI/dashboard (external)
- Docker registry authentication: Configured at container runtime level (external)

## Webhooks & Callbacks

**Incoming:**
- GitHub: PR webhooks trigger CI validation

**Outgoing:**
- Health checks: HTTP health checks within job definitions
  - Example from Deepseek-R1 job definition:
    ```json
    {
      "body": "{\"model\":\"DeepSeek-R1-Distill-Qwen-7B\",\"messages\":[{\"role\":\"user\",\"content\":\"Respond with a single word: Ready\"}],\"stream\":false}",
      "path": "/v1/chat/completions",
      "type": "http",
      "method": "POST",
      "headers": { "Content-Type": "application/json" },
      "expected_status": 200,
      "continuous": false
    }
    ```
  - Validates container readiness before marking job as healthy

## Container Registry Details

**Used in templates:**
- `docker.io` (Docker Hub)
  - nosana-maintained: `nosana/comfyui`, `nosana/automatic1111`, `nosana/janus-pro`, `nosana/vscode-server`, `nosana/rstudio`, `nosana/pytorch-jupyter`, `nosana/tensorflow-jupyter`, `nosana/llama-factory`, `nosana/nosana-chat-bot`, `nosana/sd-forge-bench`, `nosana/sd-invoke-bench`
  - Community: `vllm/vllm-openai`, `ollama/ollama`, `openmmlab/lmdeploy`, `winglian/axolotl-cloud`, `atinoda/text-generation-webui`
- `ghcr.io` (GitHub Container Registry)
  - `huggingface/text-generation-inference`, `open-webui/open-webui`, `rsxdalv/tts-generation-webui`
- `registry.hf.space` (Hugging Face)
  - `openai-whisper`

---

*Integration audit: 2025-04-03*
