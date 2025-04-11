# AI Meme Generator

A GPU-powered meme generator that uses AI to create funny memes based on different themes. This template leverages the power of GPT-2 and GPU acceleration to generate context-aware meme captions and combine them with popular meme templates.

## Features

- Generates memes using AI-powered captions
- Supports multiple themes (tech, politics, crypto)
- Uses GPU acceleration for faster processing
- Randomly selects from popular meme templates
- Outputs high-quality meme images

## How It Works

1. **Caption Generation**:
   - Uses GPT-2 model for text generation
   - Generates context-aware captions based on theme
   - Optimized for GPU acceleration

2. **Meme Creation**:
   - Selects from popular meme templates
   - Splits caption into top and bottom text
   - Renders text onto template
   - Saves final image

## Requirements

- **GPU**: NVIDIA 3060 (recommended)
  - Minimum 8GB VRAM
  - CUDA support required
- **Python**: 3.9+
- **Dependencies**:
  - torch
  - transformers
  - Pillow
  - requests

## Usage

1. Set the `MEME_THEME` environment variable to your desired theme:
   - `tech`: For technology-related memes
   - `politics`: For political memes
   - `crypto`: For cryptocurrency-related memes
   - `default`: For general memes

2. Run the job on Nosana Network:
   ```bash
   nosana job run ai-meme-generator
   ```

3. The generated meme will be available as an output file named `generated_meme.jpg`

## Screenshot of Deployment

![Deployment Running ]( https://drive.google.com/file/d/1VXlrgrpLSUO_S2if3tFP163YQsyFRlDq/view?usp=drivesdk )



## Performance

- Average generation time: 1-2 minutes
- GPU utilization: Moderate
- Memory usage: ~4GB
- Network requirements: Minimal

## Cost Optimization

- Uses NVIDIA 3060 GPU for best cost-performance ratio
- Efficient resource utilization
- Quick execution time

## Extensions

This template can be extended with additional features:

1. **Discord Integration**: Add webhook support to automatically post generated memes
2. **Stable Diffusion**: Integrate with Stable Diffusion for custom meme backgrounds
3. **Custom Templates**: Add support for local meme templates
4. **Multi-language Support**: Add support for generating memes in different languages

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License 
