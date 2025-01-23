# R1-Llama-70B-AWQ Model

![DeepSeek](https://avatars.githubusercontent.com/u/148330874?s=48&v=4)

A high-throughput and memory-efficient inference engine for running DeepSeek's R1-Llama-70B-AWQ model using vLLM.

## Description

This template provides an OpenAI-compatible API server for the R1-Llama-70B-AWQ model, optimized for performance using vLLM. This is a 4-bit quantized version of the Llama-3.3-70B-Instruct model, fine-tuned with DeepSeek-R1 samples, offering excellent performance while maintaining quality.

## Usage Recommendations (from DeepSeek)

We recommend adhering to the following configurations when utilizing the DeepSeek-R1 series models, including benchmarking, to achieve the expected performance:

- Set the temperature within the range of 0.5-0.7 (0.6 is recommended) to prevent endless repetitions or incoherent outputs.
- Avoid adding a system prompt; all instructions should be contained within the user prompt.
- For mathematical problems, it is advisable to include a directive in your prompt such as: "Please reason step by step, and put your final answer within \boxed{}."
- When evaluating model performance, it is recommended to conduct multiple tests and average the results.

## Model Details

- **Name**: R1-Llama-70B-AWQ
- **Base Model**: Llama-3.3-70B-Instruct
- **Size**: 70 billion parameters (4-bit quantized)

## Usage

The API follows the OpenAI API format and can be accessed via HTTP requests to port 9000. The model is served with the name "R1-Llama-70B-AWQ".

## License

This model is derived from Llama3.3-70B-Instruct and is licensed under the llama3.3 license. The model weights and code are available for commercial use.

## Links

- [DeepSeek R1 GitHub Repository](https://github.com/deepseek-ai/DeepSeek-R1)
- [vLLM Documentation](https://github.com/vllm-project/vllm) 