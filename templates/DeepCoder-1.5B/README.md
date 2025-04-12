# DeepCoder-1.5B Preview

A high-performance code generation model served via vLLM with an OpenAI-compatible API endpoint.

## Description

This template provides an OpenAI-compatible API server for the DeepCoder-1.5B model, optimized for performance using vLLM. The model is specifically trained for code generation and understanding across multiple programming languages.

## Key Features
- High-performance inference with vLLM
- OpenAI-compatible API
- Specialized in code generation
- Multi-language support
- Optimized for GPU acceleration

## Configuration
- Port: 8000
- GPU: Required (24GB+ VRAM)
- Model: agentica-org/DeepCoder-1.5B-Preview
- Context Length: 8192 tokens

## Usage
You can interact with the model using the OpenAI API format:
```python
from openai import OpenAI


openai_api_key = "EMPTY"
openai_api_base = "https://fletcsut7rq2xsjcqw8vvfldgopf273zizxmbdtwqrjp.node.k8s.prd.nos.ci/v1" # my deployed nosara job

client = OpenAI(
    api_key=openai_api_key,
    base_url=openai_api_base,
)
completion = client.completions.create(model="agentica-org/DeepCoder-1.5B-Preview",
                                      prompt="Write me a simple binary search in python" , max_tokens=5000)

print(completion.choices[0].text)
```

## License
This model is available for research and commercial use. Please check the model card for the most up-to-date licensing information.

## Nosana Run
https://dashboard.nosana.com/jobs/89JkqUAY3y1MULRp7QLRovguDad169CgBkfiVPSBKvxt