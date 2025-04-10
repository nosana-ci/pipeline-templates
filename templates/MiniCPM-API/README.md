# MiniCPM API

Deploy MiniCPM, a highly efficient multilingual LLM optimized for both performance and efficiency using Nosana's GPU infrastructure.

## About MiniCPM
MiniCPM is a suite of lightweight, cost-effective yet high-performance language models developed by the OpenBMB team at Tsinghua University and Smart Cloud AI System Lab. This template deploys the 2B parameter model variant, which offers excellent performance while requiring minimal GPU resources.

## Key Features
- High-performance 2B parameter multilingual LLM
- Optimized for efficiency on smaller GPUs (16GB VRAM)
- OpenAI-compatible API via vLLM serving
- Strong multilingual capabilities (English & Chinese)
- Excellent performance on reasoning and instruction following tasks
- Low-latency inference

## Configuration
- Port: 9000
- GPU: Required (minimum 16GB VRAM)
- Default Model: openbmb/MiniCPM-2B-dpo-fp16

## Example Usage

After deployment, you can interact with the model using standard OpenAI client libraries:

```python
import openai

# Replace with your actual Nosana endpoint
client = openai.OpenAI(
    base_url="https://your-nosana-endpoint/v1",
    api_key="dummy-key"  # vLLM doesn't check API keys
)

response = client.chat.completions.create(
    model="MiniCPM-2B",
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "What's the capital of France?"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)
```

## References
- [MiniCPM GitHub Repository](https://github.com/OpenBMB/MiniCPM)
- [vLLM Documentation](https://docs.vllm.ai/) 