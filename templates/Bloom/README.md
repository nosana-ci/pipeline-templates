# BLOOM API

Deploy BLOOM, a powerful multilingual language model developed by BigScience, using Nosana's GPU infrastructure.

## About BLOOM
BLOOM (BigScience Large Open-science Open-access Multilingual Language Model) is a 176B-parameter open-access language model developed by the BigScience research workshop. This template deploys the 560M parameter variant, which offers a good balance between performance and resource requirements.

## Key Features
- High-performance 560M parameter multilingual LLM
- Optimized for efficiency on smaller GPUs (16GB VRAM)
- OpenAI-compatible API via vLLM serving
- Strong multilingual capabilities (supports 46 languages)
- Excellent performance on reasoning and instruction following tasks
- Low-latency inference

## Configuration
- Port: 9000
- GPU: Required (minimum 16GB VRAM)
- Default Model: bigscience/bloom-560m


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
    model="BLOOM-560M",
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
- [BLOOM GitHub Repository](https://github.com/bigscience-workshop/bigscience)
- [BLOOM on HuggingFace](https://huggingface.co/bigscience/bloom)
- [BLOOM Research Paper](https://arxiv.org/abs/2211.05100)
- [BigScience Main Website](https://bigscience.huggingface.co/)
- [BigScience on X](https://x.com/BigscienceW)


