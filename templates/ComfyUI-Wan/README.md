# ComfyUI with WAN 2.1 Models
This template provides a ComfyUI installation with WAN 2.1 text-to-video and image-to-video models pre-downloaded.

WAN 2.1 text-to-video model for generating videos from text prompts
WAN 2.1 image-to-video model for animating still images
Pre-configured workflows for both text-to-video and image-to-video generation
Full GPU acceleration support

## Usage
The service will be available after deployment
Access the ComfyUI interface through your browser
Load one of the pre-downloaded workflows:

text_to_video_wan.json - Create videos from text descriptions
image_to_video_wan.json - Animate still images into videos

Customize the prompts and parameters as needed
Run the workflow to generate your video

## Included Models
The following WAN 2.1 models are pre-downloaded:

Text encoder: umt5_xxl_fp8_e4m3fn_scaled.safetensors
VAE: wan_2.1_vae.safetensors
Text-to-video diffusion model: wan2.1_t2v_1.3B_fp16.safetensors
Image-to-video diffusion model: wan2.1_i2v_480p_14B_fp16.safetensors
CLIP vision model: clip_vision_h.safetensors

## Resources

- ComfyUI Documentation: [ComfyUI GitHub](https://github.com/comfyanonymous/ComfyUI)
- WAN Models: [Wan2.1 Github](https://github.com/Wan-Video/Wan2.1)
- Example Workflows: [ComfyUI Examples Wan](https://comfyanonymous.github.io/ComfyUI_examples/wan/)
