# Mixtral 8x7B Instruct

Mistral AI's instruction-tuned Sparse Mixture of Experts (SMoE) model that outperforms many larger models including Llama 2 70B.

## Key Features
- 46.7B total parameters (12.9B active parameters)
- Supports English, French, Italian, German, and Spanish
- 32k context window
- Sparse MoE architecture for efficiency
- Strong reasoning capabilities

## Configuration
- Port: 8000
- GPU: Required (48GB+ VRAM)
- Model: mistralai/Mixtral-8x7B-Instruct-v0.1
- API: OpenAI-compatible API (vLLM)

## Usage

```python
# Chat with Mixtral
client = openai.Client(base_url="http://localhost:8000/v1", api_key="dummy-key")
response = client.chat.completions.create(
    model="mixtral-8x7b-instruct",
    messages=[{"role": "user", "content": "Explain quantum computing"}],
    temperature=0.7
)
```

## Instruction Format
Mixtral-8x7B-Instruct uses a specific instruction format:

```
<s>[INST] Instruction [/INST] Model answer</s>[INST] Follow-up instruction [/INST]
```

However, when using the OpenAI-compatible API, this formatting is handled automatically.

## Advanced Configuration
You can tweak vLLM parameters for optimal performance by modifying the command in the job definition:

- `--tensor-parallel-size`: Number of GPUs for tensor parallelism (default: 1)
- `--max-model-len`: Maximum sequence length (default: 32768)
- `--dtype`: Model precision (default: bfloat16)
- `--gpu-memory-utilization`: GPU memory utilization target (default: 0.9)

## Additional Information
For more details on the Mixtral 8x7B model and its capabilities, visit the [Hugging Face model page](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1) or check out [Mistral AI's blog post](https://mistral.ai/news/mixtral-of-experts/). 