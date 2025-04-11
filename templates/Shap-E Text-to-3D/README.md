# Shap-E Text to 3D Generator

## Description
This template provides an easy way to generate 3D models from text descriptions using OpenAI's Shap-E model via Huggingface. The model transforms text prompts into animated 3D objects and exports them as GIF files that show the object from multiple angles.

## Features
- Convert text descriptions to 3D models
- Uses OpenAI's Shap-E model from Huggingface
- GPU-accelerated for optimal performance
- Outputs animated GIFs showing the 3D object from different angles
- Customizable guidance scale and inference steps

## Technical Details
- Model: `openai/shap-e`
- Default guidance scale: 15.0
- Default inference steps: 64
- Output format: Animated GIF

## Requirements
- GPU resources for efficient processing

## Usage
1. Enter your desired text prompt in the PROMPT environment variable
2. Run the job through the Nosana dashboard
3. Download the generated animated GIF from the output directory

## Example Prompts

<table align="center">
    <tbody>
        <tr>
            <td align="center">
                <img src="shark_3d.gif" alt="A shark">
            </td>
            <td align="center">
                <img src="elephant_3d.gif" alt="An elephant">
            </td align="center">      
        </tr>
        <tr>
            <td align="center">A shark</td>
            <td align="center">An elephant </td>  
        </tr>
    </tbody>
<table>

## How It Works
The job uses the Shap-E diffusion model from OpenAI, which has been trained to generate 3D shapes from text descriptions. The model creates a 3D representation that is then rendered from multiple angles to create an animated GIF.

```python
import torch
from diffusers import ShapEPipeline
from diffusers.utils import export_to_gif

ckpt_id = "openai/shap-e"
pipe = ShapEPipeline.from_pretrained(ckpt_id).to("cuda")

guidance_scale = 15.0
prompt = "a shark"
images = pipe(
    prompt,
    guidance_scale=guidance_scale,
    num_inference_steps=64,
).images

gif_path = export_to_gif(images[0], "shark_3d.gif")
```

## Links
- [Shap-E Model on Huggingface](https://huggingface.co/openai/shap-e)
- [Example Successful Nosana Job](insert_link_to_your_successful_job_run)