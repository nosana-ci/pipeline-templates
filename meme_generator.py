import os
import random
import requests
from PIL import Image, ImageDraw, ImageFont
from transformers import pipeline
import torch

# Configuration
MEME_TEMPLATES = [
    "https://api.memegen.link/images/ds/{{top}}/{{bottom}}.png",
    "https://api.memegen.link/images/af/{{top}}/{{bottom}}.png",
    "https://api.memegen.link/images/grumpycat/{{top}}/{{bottom}}.png"
]

def get_theme_prompt(theme):
    theme_prompts = {
        "tech": "Generate a funny tech-related meme caption about programming, AI, or computers",
        "politics": "Generate a funny political meme caption",
        "crypto": "Generate a funny cryptocurrency or blockchain-related meme caption",
        "default": "Generate a funny meme caption"
    }
    return theme_prompts.get(theme.lower(), theme_prompts["default"])

def generate_caption(theme):
    # Initialize the text generation pipeline with a small model
    generator = pipeline('text-generation', model='gpt2', device=0 if torch.cuda.is_available() else -1)
    
    prompt = get_theme_prompt(theme)
    result = generator(prompt, max_length=50, num_return_sequences=1)
    caption = result[0]['generated_text'].strip()
    
    # Clean up the caption
    caption = caption.replace(prompt, "").strip()
    return caption

def create_meme(caption):
    # Select a random template
    template_url = random.choice(MEME_TEMPLATES)
    
    # Split caption into top and bottom
    words = caption.split()
    mid = len(words) // 2
    top_text = " ".join(words[:mid])
    bottom_text = " ".join(words[mid:])
    
    # Download the meme template
    meme_url = template_url.replace("{{top}}", top_text).replace("{{bottom}}", bottom_text)
    response = requests.get(meme_url)
    
    if response.status_code == 200:
        with open("generated_meme.jpg", "wb") as f:
            f.write(response.content)
        return True
    return False

def main():
    # Get theme from environment variable
    theme = os.getenv("MEME_THEME", "default")
    
    # Generate caption
    caption = generate_caption(theme)
    print(f"Generated caption: {caption}")
    
    # Create meme
    if create_meme(caption):
        print("Meme generated successfully!")
    else:
        print("Failed to generate meme")

if __name__ == "__main__":
    main() 