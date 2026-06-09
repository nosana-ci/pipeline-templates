# Cosmos 3 Nano

NVIDIA Cosmos 3 Nano is a 16B-parameter omnimodal world model for Physical AI and robotics. It can process and generate text, images, video, audio, and action trajectories. This template serves the model with the vLLM-Omni extension, exposing an OpenAI-compatible API.

## Included Model

### Cosmos3-Nano
- **Model**: `nvidia/Cosmos3-Nano`
- **Parameters**: 16B
- **Modalities**: Text, Image, Video, Audio, Action
- **VRAM Required**: ~96 GB
- **Use Case**: Multimodal generation, synthetic data, robotics / embodied action control

## Highlights

- **Omnimodal**: Combine text, image, video, audio, and action inputs and outputs
- **Physical AI**: Ingests camera observations and instructions to output control actions
- **OpenAI-compatible API**: Standard `/v1` endpoints served by vLLM-Omni
- **Synthetic Data**: Image-to-video generation for RL and simulation datasets

## Hugging Face Token

The model weights and the Cosmos guardrail repository are gated, so the job needs a Hugging Face token with read access to gated repos.

### Create the token

Use this pre-filled link, which sets the correct scope automatically:

[Create a fine-grained HF token with gated-repo read access](https://huggingface.co/settings/tokens/new?canReadGatedRepos=true&tokenType=fineGrained)

For this job you only need **read access to download gated model files**:

- **Repositories → Read access to contents of all public gated repos you can access** ✅

You do **not** need: write access, inference permissions, webhooks, collections, billing, jobs, discussions, or notifications.

Steps:

1. Open the link above (the gated-repo read scope is already checked).
2. Name it something like `nosana-cosmos3`.
3. Create the token.
4. Accept the terms on **both** gated repos with that account:
   - <https://huggingface.co/nvidia/Cosmos3-Nano>
   - <https://huggingface.co/nvidia/Cosmos-1.0-Guardrail>
5. Put the token into the job definition as the `HF_TOKEN` env value.

> Do not share the token in chat, screenshots, or commits. If it leaks, revoke it on Hugging Face and create a new one.

To skip the guardrail dependency entirely, append `--no-guardrails` to the `cmd` array. You are then responsible for license and compliance behavior.

## Configuration

```json
"env": {
  "HF_TOKEN": "hf_...",
  "VLLM_OMNI_STORAGE_PATH": "/tmp/vllm-omni-videos",
  "VLLM_OMNI_STORAGE_MAX_CONCURRENCY": "1"
}
```

- `HF_TOKEN` — your gated-repo read token (see above).
- `VLLM_OMNI_STORAGE_PATH` — where generated videos are persisted.
- `VLLM_OMNI_STORAGE_MAX_CONCURRENCY` — keep at `1` for video stability; send one generation request at a time.

> Cosmos 3 can take extra time to compile CUDA graphs and initialize multimodal weights, so the server is launched with `--init-timeout 1800`. The health check may take several minutes to pass on first boot.

## Usage

The model is served on port 8000, exposed at your deployment URL with OpenAI-compatible endpoints:

- **Model Info**: `GET /v1/models`
- **Image Generation**: `POST /v1/images/generations`
- **Video Generation (sync)**: `POST /v1/videos/sync`

### Check the server

```bash
curl -sS https://your-deployment-url/v1/models
```

Expected: JSON, not HTML.

### Generate an image

```bash
curl -sS -X POST https://your-deployment-url/v1/images/generations \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nvidia/Cosmos3-Nano",
    "prompt": "A cinematic photo of a small autonomous robot in a futuristic warehouse, dramatic lighting, high detail",
    "negative_prompt": "blurry, distorted, low quality",
    "size": "1024x1024",
    "n": 1,
    "response_format": "b64_json",
    "num_inference_steps": 30,
    "guidance_scale": 7.0,
    "seed": 42
  }' \
  | jq -r '.data[0].b64_json' | base64 -d > cosmos-output.png
```

### Generate a video

Start small to keep the diffusion worker stable. The `-fL` flags make curl fail on an HTTP error instead of saving an error page as your `.mp4`:

```bash
BASE="https://your-deployment-url"

curl -fL -X POST "$BASE/v1/videos/sync" \
  -H "Accept: video/mp4" \
  -F "model=nvidia/Cosmos3-Nano" \
  -F "prompt=A small autonomous robot driving through a futuristic warehouse, cinematic, realistic" \
  -F "negative_prompt=blurry, distorted, low quality, jittery motion" \
  -F "width=480" \
  -F "height=272" \
  -F "num_frames=33" \
  -F "fps=8" \
  -F "num_inference_steps=12" \
  -F "guidance_scale=7.0" \
  -F "seed=42" \
  -o cosmos-video.mp4

file cosmos-video.mp4
head -c 64 cosmos-video.mp4 | xxd
```

A valid MP4 shows `ftyp` near the beginning and should not be reported as an HTML document.
