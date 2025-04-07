AI Meme Generator

Ever wanted to automate chaos? This template lets you generate original memes using AI. It pulls a random meme template and uses a language model to caption it — funny, disturbing, or eerily accurate. You don’t get to choose. The AI is in charge now.

## 🔧 What It Does
- Pulls a meme template (randomly)
- Generates a caption based on a theme (e.g., tech, politics, crypto)
- Renders the meme using `Pillow`
- Saves the final meme image for download

## 📦 Requirements
- Nosana GPU job runner
- Docker (handled by Nosana)
- Python dependencies (auto-installed): `transformers`, `Pillow`, `requests`

## 🚀 Inputs
- `THEME`: Set your meme theme. Try: `tech`, `cats`, `relationships`, `existential dread`

## 🖼️ Output
- `generated_meme.jpg`: The final meme. Download it. Frame it. Cry over it.

## 👩‍💻 Example Usage
```bash
nosana run job-definition.json --env THEME=crypto
