# MiniMax Music 3

Open-weight music generation in ComfyUI. Give it lyrics and a description of the
sound, and it renders a full song — intro / verse / chorus / bridge / outro —
in stereo, up to 5 minutes long.

## Model

MiniMax Music 3 is a hybrid architecture: an 8B LLM (built on Qwen3-8B) handles
long-range song structure, a 0.6B LLM fills in frame-level acoustic detail, and
a flow-matching + Flow-VAE stage turns the combined hidden states into audio
rather than decoding straight from tokens — which is what keeps longer tracks
coherent instead of drifting.

Weights are pulled from [Comfy-Org/MiniMax-Music-3](https://huggingface.co/Comfy-Org/MiniMax-Music-3):

| File | Location | Size |
|---|---|---|
| `minimax_music3_dit_fp16.safetensors` | `models/diffusion_models/` | 4.9 GB |
| `minimax_music3_text_encoder_pruned_int8_convrot.safetensors` | `models/text_encoders/` | 9.2 GB |
| `minimax_music3_dav.safetensors` | `models/vae/` | 0.2 GB |

- **VRAM Required**: 24 GB (peak ~14.5 GB on a 4090 at the default 120 s target)
- **Web UI**: ComfyUI on port 8188
- **Speed**: ~3 min for a 30 s song, ~5 min for a 2 min song, on a single 4090

The image pins ComfyUI v0.33.2; MiniMax Music 3 nodes were added in 0.33.0.

## Usage

1. Open the ComfyUI web interface on port 8188.
2. Load the built-in template: **Workflow → Browse Templates → Audio → MiniMax Music 3**
   (the workflow is also at
   [workflow_templates](https://github.com/Comfy-Org/workflow_templates/blob/main/templates/audio_minimax_music_3.json)).
   The model files it expects are the ones this template downloads.
3. Fill in **Caption** and **Lyrics**, set `max_duration`, and queue the prompt.

## Writing the prompt

**Lyrics** carry the structure. Section tags are the only executable structural
instruction — the lyric text itself only conveys mood:

```
[Intro] [Verse] [Pre-Chorus] [Chorus] [Post-Chorus] [Bridge] [Instrumental] [Solo] [Outro]
```

**Caption** describes the sound. Plain prose works, but the model responds best
to a structured caption in three sections:

- **Global Metadata** — genre, BPM, key, emotional arc, production profile.
- **Vocal Details** — gender, timbre, harmony, backing vocals, effects.
- **Arrangement** — instruments, how they evolve section to section, groove,
  bass, percussion, spatial effects.

MiniMax publishes a caption-rewriting guide at
[MiniMax-AI/MiniMax-Music3](https://github.com/MiniMax-AI/MiniMax-Music3).

## Parameters

| Parameter | Description |
|---|---|
| `max_duration` | Upper bound on length in seconds (default 120, up to 360 on the node). The model can and does end a song earlier when the lyrics run out. |
| `seed` | Fix it to reproduce a take, change it for a different one. |
| `tiled_decode` | Decodes the audio VAE in overlapping tiles to cut VRAM on long songs, at a small risk of seams. Off gives the best quality when VRAM allows. |

## Notes

- Output is written by `SaveAudioAdvanced` (MP3 by default; FLAC and Opus are
  available on the node) and downloadable from the ComfyUI UI.
- The same graph runs headless over the ComfyUI API on `/prompt`, so the
  template works as a music-generation backend as well as a UI.
- For a lower-VRAM run, swap the diffusion model for
  `minimax_music3_dit_int8_convrot.safetensors` (2.5 GB) via ComfyUI-Manager or
  the model manager, and enable tiled decode.
