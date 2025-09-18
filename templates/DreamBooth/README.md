# 🎨 DreamBooth Trainer Template for Nosana

This template enables users to fine-tune the `Stable Diffusion v1.5` model using DreamBooth, allowing personalized AI image generation with custom image data. Easily deploy and train directly on Nosana’s decentralized GPU network.

---

## 🚀 Features

- Upload your own training images (person, object, pet)
- Outputs a fine-tuned Stable Diffusion model
- Built with 🤗 Hugging Face Diffusers & Accelerate
- GPU accelerated for fast training
- Fully containerized and easy to run from Nosana Dashboard

---

## 🧾 Usage

1. Prepare a folder of 4–10 subject images in `/data/images`
2. Modify the instance prompt (e.g., `photo of sks person`)
3. Job runs training and saves the new model in `/data/output`

---

## 🧪 Job Inputs & Outputs

| Path           | Purpose                                      |
|----------------|----------------------------------------------|
| `/data/images` | Training images folder                       |
| `/data/output` | Trained DreamBooth model (Diffusers format) |

---

## 🧠 Requirements

- GPU: A100 or V100 (Recommended VRAM: 24GB+)
- Job Runtime: ~20–40 minutes depending on steps

---

## ⚙️ Model Details

- Base: `runwayml/stable-diffusion-v1-5`
- Fine-tuning with custom instance prompt
- Train steps: 800 (adjustable)

---

## 📂 Example Prompt

```bash
photo of sks person in a sci-fi setting
