# Yi-1.5-34B
Yi-1.5-34B instruction-tuned model served via vLLM with an OpenAI-compatible API endpoint.

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- 34B parameter model with 32k context length
- Instruction-tuned for better responses
- Optimized for GPU acceleration

## Configuration
- Port: 9000
- GPU: Required (72GB VRAM)
- Model: 01-ai/Yi-1.5-34B
- Context Length: 32,000 tokens
- Hugging Face token: Required

## Usage
You can interact with the model using the OpenAI API format:

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