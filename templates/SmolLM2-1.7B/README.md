The largest model in the SmolLM2 family, designed for high-performance instruction-based tasks, served via vLLM.

## Description

SmolLM2-1.7B-Instruct supports advanced features like function calling and multi-turn dialogue. It was built using high-quality public and private data and refined through SFT and DPO. With significantly greater capacity, it delivers better generalization and performance on complex tasks compared to smaller variants.

## Key Features

- 1.7B parameter instruction-tuned model
- Function-calling and reasoning capabilities
- Enhanced SFT with datasets like Synth-APIGen-v0.1
- Optimized for GPU-backed inference using vLLM
- OpenAI-compatible API server

## Configuration

- **Model**: `HuggingFaceTB/SmolLM2-1.7B-Instruct`
- **Inference Server**: [vLLM](https://github.com/vllm-project/vllm)
- **API Port**: `9000`
- **GPU**: Required (16GB VRAM)
- **License**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Usage

Once deployed, access the API at: https://`<nosana-node>`:9000/v1/completions

```python
import openai

client = openai.Client(
    base_url="https://<nosana-node>:9000/v1"
)

response = client.chat.completions.create(
    model="smollm2-1.7b-instruct",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Rewrite this sentence to be more formal."}
    ]
)
print(response.choices[0].message.content)
```