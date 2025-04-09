SDXL Image Generator – Nosana Template

This Nosana template allows you to deploy **Stable Diffusion XL** (SDXL) and generate high-quality images from text prompts using a REST API.


What It Does

- Installs `diffusers`, `torch`, and dependencies
- Loads SDXL from Hugging Face
- Hosts a Flask server with a `/generate` endpoint


Usage

Send a POST request:


Returns: A PNG image

---

Requirements

- GPU-enabled worker (Nosana handles that ✅)
- About ~8GB of memory
- Access to Hugging Face (no auth needed for base model)

---

Files

- `job-definition.json` – Nosana job config
- `info.json` – Dashboard metadata
- `README.md` – This guide!

---

Resources

- [SDXL on Hugging Face](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)
- [Nosana Docs](https://docs.nosana.io)