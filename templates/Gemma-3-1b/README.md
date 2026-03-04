# Gemma 3 1B

Google's Gemma 3 1B instruction-tuned model served via vLLM with an OpenAI-compatible API endpoint.

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- 1B parameter model with 8k context length
- Instruction-tuned for better responses
- Optimized for GPU acceleration

## Configuration
- Port: 9000
- GPU: Required (8GB+ VRAM)
- Model: google/gemma-3-1b-it
- Context Length: 8,192 tokens

## Usage
You can interact with the model using the OpenAI API format:
```python
import openai

client = openai.Client(
    base_url="http://localhost:9000/v1"
)

response = client.chat.completions.create(
    model="Gemma-3-1b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me about Gemma 3."}
    ]
)
print(response.choices[0].message.content)
``` 