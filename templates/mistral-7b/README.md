# Mistral 7B Inference Template

Deploy Mistral 7B for high-performance text generation on Nosana's decentralized GPU network.

## Features
- Optimized for low-latency inference via Hugging Face's `text-generation-inference`.
- Supports 4-bit quantization for reduced GPU memory usage.
- Configurable input/token limits.

## Usage
1. **Deploy**: Submit this job via the Nosana Dashboard or CLI.
2. **Access API**:
   ```bash
   curl -X POST http://<JOB_IP>:8080/generate \
     -H "Content-Type: application/json" \
     -d '{"inputs": "Summarize this: ...", "parameters": {"max_new_tokens": 200}}'