# AI Meme Generator for Nosana Network

A GPU-powered meme generator that uses AI to create funny memes based on different themes. This template is designed to run on the Nosana Network and leverages GPU acceleration for optimal performance.

## Features

- Generates memes using AI-powered captions
- Supports multiple themes (tech, politics, crypto)
- Uses GPU acceleration for faster processing
- Randomly selects from popular meme templates
- Outputs high-quality meme images

## Technical Requirements

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

3. **Output**:
   - Generates a JPG image
   - Saves as `generated_meme.jpg`
   - Available for download from job outputs

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

Feel free to submit issues!

## License

MIT License 
