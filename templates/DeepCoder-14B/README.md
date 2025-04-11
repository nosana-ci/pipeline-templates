# DeepCoder-14B Preview

A high-performance code generation model served via vLLM with an OpenAI-compatible API endpoint.

## Description

This template provides an OpenAI-compatible API server for the DeepCoder-14B model, optimized for performance using vLLM. The model is specifically trained for code generation and understanding across multiple programming languages.

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- Specialized in code generation
- Multi-language support
- Optimized for GPU acceleration

## Configuration
- Port: 8000
- GPU: Required (24GB+ VRAM)
- Model: agentica-org/DeepCoder-14B-Preview
- Context Length: 8192 tokens

## Usage
You can interact with the model using the OpenAI API format:
```python
import openai

client = openai.Client(
    base_url="http://localhost:8000/v1",
    api_key="dummy"
)

response = client.chat.completions.create(
    model="DeepCoder-14B",
    messages=[
        {"role": "system", "content": "You are an expert programmer."},
        {"role": "user", "content": "Write a Python function that implements binary search."}
    ]
)
print(response.choices[0].message.content)
```

## License
This model is available for research and commercial use. Please check the model card for the most up-to-date licensing information.
