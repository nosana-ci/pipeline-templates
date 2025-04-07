# AI Meme Generator for Nosana Network

A GPU-powered meme generator that uses AI to create funny memes based on different themes. This template is designed to run on the Nosana Network and leverages GPU acceleration for optimal performance.

## Features

- Generates memes using AI-powered captions
- Supports multiple themes (tech, politics, crypto)
- Uses GPU acceleration for faster processing
- Randomly selects from popular meme templates
- Outputs high-quality meme images

## Requirements

- Python 3.9+
- GPU-compatible hardware
- Internet connection (for template fetching)

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

## Output

The job produces a single output:
- `generated_meme.jpg`: The final meme image with AI-generated caption

## Technical Details

- Uses GPT-2 for caption generation
- Leverages the Meme Generator API for template images
- Implements GPU acceleration through PyTorch
- Automatically splits captions for top and bottom text

## Extensions

This template can be extended with additional features:

1. **Discord Integration**: Add webhook support to automatically post generated memes to Discord channels
2. **Stable Diffusion**: Integrate with Stable Diffusion to generate custom meme backgrounds
3. **Custom Templates**: Add support for local meme templates
4. **Multi-language Support**: Add support for generating memes in different languages

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License 