# MiniMax H3 Video

Open-weight video generation in ComfyUI. MiniMax H3 generates **video and its
soundtrack in one pass** — a single sampling run produces a joint audio/video
latent, so the sound belongs to the motion instead of being dubbed onto it.

Default output is 1344×768, 124 frames at 24 fps (~5 s), with 32 kHz stereo
audio. The frame count snaps to the model's 17k+5 grid; the trained range is
roughly 124–362 frames.

## Variants

Two tasks, each for a GPU class:

| Variant | Task | Text encoder | Requires |
|---|---|---|---|
| Image to Video (32 GB) | prompt + optional first/last keyframe | Qwen3-VL 32B nvfp4 | 32 GB, Blackwell |
| Image to Video (80 GB) | prompt + optional first/last keyframe | Qwen3-VL 32B int8 | 80 GB |
| Reference to Video (32 GB) | reference images drive identity | Qwen3-VL 32B nvfp4 | 32 GB, Blackwell |
| Reference to Video (80 GB) | reference images drive identity | Qwen3-VL 32B int8 | 80 GB |

The nvfp4 encoder needs Blackwell hardware (RTX 5090, RTX Pro 6000). The 80 GB
variants use the int8 encoder, which runs on any architecture but needs the
bigger card to sit beside the diffusion model.

With no keyframe and no reference image, both tasks are plain text-to-video.

## Requirements

The image is built on CUDA 13 (torch 2.13 + cu130), which comfy-kitchen's
optimized CUDA backend and ComfyUI's DynamicVRAM both require — on cu128 they
disable themselves and every quantized model runs the eager path. **A node
needs an r580+ driver to run this image.**

## Measured on an RTX 5090 (32 GB)

Image-to-video variant, fp8 diffusion model + nvfp4 encoder. These numbers were
taken on the cu128 image (`2.0.9`); the cu130 image the template now points at
enables the optimized backend and DynamicVRAM, so treat them as an upper bound
on time rather than a target:

| Run | Peak VRAM | Time |
|---|---|---|
| 832×480, 124 frames, 8 steps, cfg 1.0 | 27.0 GB | ~1 min |
| 1344×768, 124 frames, 8 steps, cfg 1.0 | 27.2 GB | ~3.5 min |
| 1344×768, 124 frames, first_frame supplied | 27.3 GB | ~3.5 min |
| 1344×768, 124 frames, 30 steps, cfg 4.0 | 27.3 GB | ~20 min |

VRAM is dominated by the 21 GB diffusion model, so resolution, length and step
count move the peak far less than you would expect — every run above lands
within 300 MB of the others. What they change is time: cfg above 1.0 evaluates
the model twice per step, so 30 steps at cfg 4.0 costs roughly six times an
8-step run at cfg 1.0.

Reference-to-video, one reference image, same node and settings:

| Run | Peak VRAM | Time |
|---|---|---|
| 1344×768, 124 frames, 8 steps, 1 ref image | 26.7 GB | ~3.5 min |

And on an RTX Pro 6000 (96 GB), the 80 GB variant with the 4-step turbo LoRA:

| Run | Peak VRAM | Time |
|---|---|---|
| 1344×768, 124 frames, 4 steps, turbo LoRA | 52.6 GB | ~2 min |

## The turbo LoRA needs the 80 GB variants

MiniMax publishes 4-step turbo LoRAs, and they are a large speed win — but
applying a LoRA to fp8 weights makes ComfyUI materialise a dequantized copy of
the model, peaking at 52.6 GB where it fits. On a 32 GB card it runs out of
memory during model load at *any* resolution, including 512×288, so the 32 GB
variants do not ship the LoRA at all; use plain sampling settings there.

That verdict was measured on cu128. DynamicVRAM, which the cu130 image enables,
manages exactly this kind of oversized load, so the LoRA may become usable on
32 GB — it is not shipped there until someone measures it.

## Usage

1. Open ComfyUI on port 8188.
2. Build the graph. There is no bundled workflow template for the local
   weights — the templates named `api_minimax_h3_*` in ComfyUI call MiniMax's
   cloud API instead of these files:

   ```
   UNETLoader ─────────────► ModelSamplingMiniMaxH3 ──┐
   CLIPLoader (type minimax) ─┐                       ├─► KSampler ─┬─► VAEDecode (video VAE) ──┐
   VAELoader (video VAE) ─────┼─► MiniMax H3          │             │                           ├─► CreateVideo (24 fps) ─► SaveVideo
   VAELoader (audio VAE) ─────┘   Image to Video ─────┤             └─► VAEDecodeAudio (audio VAE) ┘
                                    │  positive ──────┤
                                    └► ConditioningZeroOut ─► negative
                                       LATENT ────────┘
   ```

3. Fill in the prompt, queue it.

Both decoders read the *same* sampled latent: `VAEDecode` with the video VAE
unwraps the video half, `VAEDecodeAudio` with the audio VAE takes the audio
half. Feed both into `CreateVideo` at 24 fps to get a file with sound.

`UNETLoader` must stay on `weight_dtype: default`. Forcing `fp8_e4m3fn` makes
the quantized kernels reject the weights (`No backend can handle
'rms_rope_split_half_'`).

### Sampler settings

| Setup | steps | cfg |
|---|---|---|
| 32 GB variants (no LoRA) | 8 for a quick look, 30 for quality | 1.0 at 8 steps, ~4.0 at 30 |
| 80 GB variants with turbo LoRA | 4 | 1.0 |

The 4-step turbo path on an 80 GB card is both the fastest and the cheapest
route to a finished clip — ~2 min against ~20 min for 30 steps on a 5090.

`ModelSamplingMiniMaxH3` sets the video and audio flow shifts together
(defaults 12.0 / 3.0). The DiT derives the audio schedule from the video one,
so set shifts on this node rather than patching sampling elsewhere.

## Reference-to-video prompting

The reference node presents its inputs to the text encoder as numbered tags,
and the prompt refers to them the same way: `<Picture 1>`, `<Video 1>`,
`<Audio 1>`, numbered per type from 1. `ref_image_size: max` gives the best
identity fidelity at a 2048 px short edge, but reference tokens ride through
every sampling step, so it is markedly slower than `match`.

Driving this node over the API: the reference inputs are autogrow groups, so
they are nested under the group name rather than passed flat. `ref_image_1` as
a top-level input is rejected with `unexpected keyword argument`; it belongs
inside `ref_images`:

```json
"ref_images": { "ref_image_1": ["14", 0] }
```

The same holds for `ref_videos`, `ref_video_audios` and `ref_audios`.

## Weights

From [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3):

| File | Location | Size |
|---|---|---|
| `minimax_h3_fl2va_pruned_fp8_scaled.safetensors` (i2v) | `models/diffusion_models/` | 21 GB |
| `minimax_h3_ref2va_pruned_fp8_scaled.safetensors` (ref2v) | `models/diffusion_models/` | 21 GB |
| `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` (32 GB variants) | `models/text_encoders/` | 16 GB |
| `qwen3vl_32b_minimax_h3_int8_convrot.safetensors` (80 GB variants) | `models/text_encoders/` | 27 GB |
| `minimax_h3_video_vae_fp16.safetensors` | `models/vae/` | 5.2 GB |
| `minimax_h3_audio_vae_fp32.safetensors` | `models/vae/` | 0.6 GB |
| 4-step turbo LoRA (80 GB variants only) | `models/loras/` | 2.0 GB |

Expect a long first start: 44–55 GB has to reach the node before ComfyUI comes
up.
