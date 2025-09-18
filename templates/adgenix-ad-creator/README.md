# AdGenix Ad Creator Template

AdGenix generates ad visuals and copy using AI, perfect for businesses needing quick, affordable marketing content.

## What It Does
- Creates an image with Flux.1 (e.g., a coffee shop scene).
- Writes a short ad slogan with DistilGPT2 (e.g., "Coffee for the bold!").

## Use Case
A small/medium business can generate a social media ad like:
- Image: A vibrant coffee shop.
- Text: "Fuel Your Day with Fresh Brews!"

## Outputs
- `ad_image.png`: The generated ad image.
- `ad_text.txt`: The ad copy.

## Requirements
- GPU-enabled Nosana node for image generation.
- Note: DistilGPT2 used for local testing due to gated model restrictions; Llama-3.2-1B-Instruct recommended for production with proper access.
