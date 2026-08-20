# MiniMax H3 Video

Open-weight video generation in ComfyUI. MiniMax H3 generates video and its
soundtrack in one sampling pass, so the audio belongs to the motion instead of
being dubbed onto it. Output is 1344×768, 124 frames at 24 fps (~5 s) by
default, with 32 kHz stereo audio. Frame count snaps to the model's 17k+5 grid;
the trained range is ~124–362 frames.

## Variants

| Variant | Task | Text encoder | Requires |
|---|---|---|---|
| Image to Video (32 GB) | prompt + optional first/last keyframe | Qwen3-VL 32B nvfp4 | 32 GB, Blackwell |
| Image to Video (80 GB) | prompt + optional first/last keyframe | Qwen3-VL 32B int8 | 80 GB |
| Reference to Video (32 GB) | reference images drive identity | Qwen3-VL 32B nvfp4 | 32 GB, Blackwell |
| Reference to Video (80 GB) | reference images drive identity | Qwen3-VL 32B int8 | 80 GB |

**Image to Video** pins your image as a real frame of the output — first frame,
optionally last frame, with the model filling in the motion between.
**Reference to Video** shows your images to the text encoder as `<Picture 1>`,
`<Video 1>`, `<Audio 1>` tags that you cite in the prompt; they carry identity
and style without fixing any frame. With neither, both are text-to-video.

The nvfp4 encoder needs Blackwell hardware (RTX 5090, RTX Pro 6000). The image
is built on CUDA 13 and needs an **r580+ driver** on the node.

## Usage

Open ComfyUI on port 8188 and build the graph — ComfyUI's bundled
`api_minimax_h3_*` templates call MiniMax's cloud API, not these local weights:

```
UNETLoader ─────────────► ModelSamplingMiniMaxH3 ──┐
CLIPLoader (type minimax) ─┐                       ├─► KSampler ─┬─► VAEDecode (video VAE) ──┐
VAELoader (video VAE) ─────┼─► MiniMax H3          │             │                           ├─► CreateVideo (24 fps) ─► SaveVideo
VAELoader (audio VAE) ─────┘   Image to Video ─────┤             └─► VAEDecodeAudio (audio VAE) ┘
                                 │  positive ──────┤
                                 └► ConditioningZeroOut ─► negative
                                    LATENT ────────┘
```

Both decoders read the same sampled latent — `VAEDecode` takes the video half,
`VAEDecodeAudio` the audio half. Feed both into `CreateVideo` for a file with
sound.

All variants ship the matching 4-step turbo LoRA — chain
`UNETLoader → LoraLoaderModelOnly → ModelSamplingMiniMaxH3`:

| Setup | steps | cfg |
|---|---|---|
| Turbo LoRA | 4 | 1.0 |
| Without the LoRA | 8 for a quick look, 30 for quality | 1.0 at 8 steps, ~4.0 at 30 |

cfg above 1.0 evaluates the model twice per step, so steps and cfg together
drive the run time.

## Notes

- Applying a LoRA to fp8 weights makes ComfyUI materialise a dequantized copy
  of the model. This fits a 32 GB card only because the CUDA 13 image enables
  ComfyUI's DynamicVRAM; on a cu128 image the same graph OOMs during load at
  any resolution.
- Keep `UNETLoader` on `weight_dtype: default`; forcing `fp8_e4m3fn` makes the
  quantized kernels reject the weights.
- `ModelSamplingMiniMaxH3` sets the video and audio flow shifts together
  (12.0 / 3.0) — the DiT derives the audio schedule from the video one.
- `ref_image_size: max` gives the best identity fidelity but runs reference
  tokens through every sampling step, so it is much slower than `match`.
- Over the API, reference inputs nest under their group:
  `"ref_images": {"ref_image_1": ["14", 0]}`.
- Expect a long first start: 44–55 GB of weights must reach the node before
  ComfyUI comes up.

## Weights

From [Comfy-Org/MiniMax-H3](https://huggingface.co/Comfy-Org/MiniMax-H3):

| File | Location | Size |
|---|---|---|
| `minimax_h3_fl2va_pruned_fp8_scaled.safetensors` (i2v) | `models/diffusion_models/` | 21 GB |
| `minimax_h3_ref2va_pruned_fp8_scaled.safetensors` (ref2v) | `models/diffusion_models/` | 21 GB |
| `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` (32 GB) | `models/text_encoders/` | 16 GB |
| `qwen3vl_32b_minimax_h3_int8_convrot.safetensors` (80 GB) | `models/text_encoders/` | 27 GB |
| `minimax_h3_video_vae_fp16.safetensors` | `models/vae/` | 5.2 GB |
| `minimax_h3_audio_vae_fp32.safetensors` | `models/vae/` | 0.6 GB |
| 4-step turbo LoRA for the matching task | `models/loras/` | 2.0 GB |
