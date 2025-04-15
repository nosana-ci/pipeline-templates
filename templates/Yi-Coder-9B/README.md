# Description
This template provides an OpenAI-compatible API server for the Yi-Coder-9B model, optimized for performance using vLLM.

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- Supports 52 major programming languages
- Instruction-tuned for better responses
- Optimized for GPU acceleration

## Model Details

- **Name**: Yi-Coder-9B
- **Base Model**: 01-ai/Yi-Coder-9B
- **Size**: 9 billion parameters
- **Context Length**: 128,000 tokens

## Configuration
- Port: 9000
- GPU: Required (20GB VRAM)
- Hugging Face token: Required

## Usage
The API follows the OpenAI API format and can be accessed via HTTP requests to port 9000. The model is served with the name "Yi-Coder-9B":

```python
import openai

client = openai.Client(
    base_url="http://localhost:9000/v1"
)

response = client.chat.completions.create(
    model="Yi-Coder-9B",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a quick sort algorithm."}
    ]
)
print(response.choices[0].message.content)
``` 