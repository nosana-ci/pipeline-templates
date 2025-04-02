# Yi-Coder-9B
Yi-Coder-9B instruction-tuned model served via vLLM with an OpenAI-compatible API endpoint. Delivers state-of-the-art coding performance with fewer than 10 billion parameters

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- 9B parameter model with 128k context length
- Supports 52 major programming languages
- Instruction-tuned for better responses
- Optimized for GPU acceleration

## Configuration
- Port: 9000
- GPU: Required (20GB VRAM)
- Model: 01-ai/Yi-Coder-9B
- Context Length: 128,000 tokens
- Hugging Face token: Required

## Usage
You can interact with the model using the OpenAI API format:

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