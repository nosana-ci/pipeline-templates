# Qwen QwQ-32B

Qwen's QwQ-32B reasoning model with OpenAI-compatible API.

## Model Overview
- Advanced reasoning model (32.5B parameters)
- Specialized for complex problem-solving tasks
- Full 131,072 token context length
- Excels at mathematical reasoning and coding challenges

## Technical Details
- Based on Qwen2.5 architecture
- Uses RoPE, SwiGLU, RMSNorm, and Attention QKV bias
- 64 layers with GQA attention (40 heads for Q, 8 for KV)
- Apache-2.0 license

## Deployment Requirements
- Port: 9000
- GPU: 80GB+ VRAM required
- Served via vLLM for optimal performance

## Best Practices
- Temperature=0.6, TopP=0.95, TopK=40 recommended
- For math problems: "Please reason step by step" improves output
- For multiple-choice: Request answers in specific format 