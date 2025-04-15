# Deepcogito Cogito-v1-preview-llama-8B

A high-throughput and memory-efficient inference engine for running Deep Cogito 's C1-Llama-8B model using vLLM.

## Description

Cogito v1 Preview is a family of hybrid reasoning models by Deep Cogito that outperform the best available open models of the same size, including counterparts from LLaMA, DeepSeek, and Qwen across most standard benchmarks.

## Model Details

We are releasing early checkpoints of models in sizes 3B, 8B, 14B, 32B and 70B trained using this methodology, starting from pretrained Llama / Qwen base checkpoints.

The models are optimized for coding, function calling, and agentic use cases.
Each model can function in a standard mode as well as a reasoning mode.
Unlike most reasoning models, we have not optimized for very long reasoning chains.4
We expect to release larger models (MoEs of sizes 109B, 400B, 671B) as well as updated checkpoints in the coming weeks / months.

## Links

- [DeepCognito C1 GitHub Repository](https://www.deepcogito.com/research/cogito-v1-preview)
- [vLLM Documentation](https://github.com/vllm-project/vllm)
