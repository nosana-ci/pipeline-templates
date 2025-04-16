A compact instruction-tuned language model from the SmolLM2 family, served with vLLM using an OpenAI-compatible API.

## Description

SmolLM2-135M-Instruct is the smallest variant in the SmolLM2 series, designed for efficient inference and low-latency applications. It was trained using supervised fine-tuning (SFT) and Direct Preference Optimization (DPO), enabling strong performance on instruction-following, summarization, and text rewriting tasks.

## Key Features

- 135M parameter instruction-tuned model
- Trained with SFT and optimized with DPO (UltraFeedback)
- Hugging Face integration with `vLLM`
- OpenAI-compatible API server
- Optimized for lightweight deployments

## Configuration

- **Model**: `HuggingFaceTB/SmolLM2-135M-Instruct`
- **Inference Server**: [vLLM](https://github.com/vllm-project/vllm)
- **API Port**: `9000`
- **GPU**: Required (4GB VRAM)
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
    model="smollm2-135m-instruct",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Rewrite this sentence to be more formal."}
    ]
)
print(response.choices[0].message.content)
```

