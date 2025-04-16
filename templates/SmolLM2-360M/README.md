A mid-sized instruction-tuned model in the SmolLM2 family, served with vLLM using an OpenAI-compatible API.

## Description

SmolLM2-360M-Instruct is designed for a balance of performance and efficiency. Trained on 4 trillion tokens with FineWeb-Edu, DCLM, and The Stack, it excels in reasoning and instruction-following. The model is further refined with DPO using UltraFeedback, making it effective for multi-turn tasks and general language understanding.

## Key Features

- 360M parameter instruction-tuned model
- Trained with SFT and optimized with DPO (UltraFeedback)
- Hugging Face integration with `vLLM`
- OpenAI-compatible API server
- Optimized for lightweight deployments

## Configuration

- **Model**: `HuggingFaceTB/SmolLM2-360M-Instruct`
- **Inference Server**: [vLLM](https://github.com/vllm-project/vllm)
- **API Port**: `9000`
- **GPU**: Required (8GB RAM)
- **License**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Usage

Once deployed, access the API at: http://`<nosana-node>`:9000/v1/completions


Compatible with OpenAI-style requests. Example:

```python
import openai

client = openai.Client(
    base_url="http://<nosana-node>:9000/v1"
)

response = client.chat.completions.create(
    model="smollm2-360m-instruct",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write about the Carbon cycle vs Nitrogen cycle."}
    ]
)
print(response.choices[0].message.content)
```

