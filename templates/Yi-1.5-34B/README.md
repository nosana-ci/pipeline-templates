# Description
This template provides an OpenAI-compatible API server for the Yi-1.5-34B model, optimized for performance using vLLM.

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- Instruction-tuned for better responses
- Optimized for GPU acceleration

## Model Details

- **Name**: Yi-1.5-34B
- **Base Model**: 01-ai/Yi-1.5-34B
- **Size**: 34 billion parameters
- **Context Length**: 32,000 tokens

## Configuration
- Port: 9000
- GPU: Required (72GB VRAM)
- Hugging Face token: Required

## Usage
The API follows the OpenAI API format and can be accessed via HTTP requests to port 9000. The model is served with the name "Yi-1.5-34B":

```python
import openai

client = openai.Client(
    base_url="http://localhost:9000/v1"
)

response = client.chat.completions.create(
    model="Yi-1.5-34B",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"}
    ]
)
print(response.choices[0].message.content)
``` 