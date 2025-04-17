# DeepCoder 14B Preview

Agentica's state-of-the-art code generation model fine-tuned from DeepSeek-R1-Distilled-Qwen-14B using reinforcement learning.

## Key Features
- 14.8B parameters optimized for code generation
- 64K context window for complex programming problems
- 60.6% Pass@1 on LiveCodeBench v5
- 1936 Codeforces Rating (95.3 percentile)
- 92.6% accuracy on HumanEval+
- MIT License

## Configuration
- Port: 8000
- GPU: Required (28GB+ VRAM)
- Model: agentica-org/DeepCoder-14B-Preview
- API: OpenAI-compatible API (vLLM)

## Usage

```python
# Generate code
client = openai.Client(base_url="http://localhost:8000/v1", api_key="dummy-key")
response = client.chat.completions.create(
    model="deepcoder",
    messages=[{"role": "user", "content": "Write a function to find the longest increasing subsequence"}],
    temperature=0.6
)
```

## Performance Benchmarks
DeepCoder-14B-Preview demonstrates impressive performance across key coding benchmarks:

| **Benchmark** | **Score** | **Notes** |
|---------------|-----------|-----------|
| LiveCodeBench v5 | 60.6% | Similar to OpenAI's o3-mini |
| Codeforces Rating | 1936 | 95.3 percentile |
| HumanEval+ | 92.6% | On par with much larger models |

## Scaling with Context Length
The model shows improved performance with longer context windows:

| **Context Length** | **LiveCodeBench Score** |
|-------------------|-------------------------|
| 16K | 45.6% |
| 32K | 57.9% |
| 64K | 60.6% |

## Additional Information
For more details on DeepCoder-14B-Preview and its training methodology, visit the [model page on Hugging Face](https://huggingface.co/agentica-org/DeepCoder-14B-Preview) or refer to the [official blog post](https://pretty-radio-b75.notion.site/DeepCoder-A-Fully-Open-Source-14B-Coder-at-O3-mini-Level-1cf81902c14680b3bee5eb349a512a51). 