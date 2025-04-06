# BLOOM

A powerful multilingual language model with 176 billion parameters supporting 46 languages and 13 programming languages, packaged as a containerized service for deployment on the Nosana decentralized compute network.

## Description

BLOOM (BigScience Large Open-science Open-access Multilingual Language Model) is a decoder-only transformer language model developed by the BigScience workshop, featuring exceptional multilingual capabilities. This integration packages BLOOM as a deployable job on Nosana's decentralized compute infrastructure, providing efficient access to this state-of-the-art language model.

## Features

- Support for 46 natural languages and 13 programming languages
- Available in multiple sizes (176B, 7.1B, 3B, 1.7B, 560M parameters)
- Optimized for distributed inferencing across Nosana nodes
- RESTful API for text generation and embeddings
- Containerized deployment with horizontal scaling

## Usage

The model is served through a RESTful API with endpoints for text generation and embeddings. Configuration settings allow for parameter adjustment and resource allocation based on deployment needs.

## Model Details

- **Name**: BLOOM
- **Architecture**: 
  - Autoregressive decoder-only transformer (GPT-like)
  - 70 layers
  - 112 attention heads per layer
  - Hidden dimensionality of 14336
  - 2048 tokens sequence length
  - ALiBi positional embeddings
  - GeLU activation function
- **Size**: 
  - 176B parameters (full model)
  - Smaller variants available (7.1B, 3B, 1.7B, 560M)
  - Full checkpoint size: 329GB (bf16 weights only), 2.3TB with optimizer states
- **Training Data**:
  - 341.6 billion tokens (1.5 TB of text data)
  - Tokenizer vocabulary: 250,680 tokens
  - Trained on text from 46 natural languages
  - Includes 13 programming languages
- **Training Infrastructure**:
  - Trained on 384 A100 GPUs (80GB memory each)
  - One copy of the model required 48 GPUs (using 60GB memory per GPU)
  - Training throughput: ~150 TFLOPs
  - Training duration: 3-4 months (started March 11, 2022)
  - Trained on the Jean Zay public supercomputer
- **Capabilities**: 
  - Text generation
  - Multilingual processing
  - Code generation
  - Vector embeddings
  - Zero-shot task performance

## Environmental Considerations

- Jean Zay supercomputer is primarily powered by nuclear energy, a low carbon energy source
- Computing infrastructure designed for high efficiency, with waste heat repurposed for heating buildings on campus
- Detailed carbon emissions estimates for training and inference are being developed

## License

This model is released under the RAIL (Responsible AI License), an open license allowing commercial use with ethical restrictions.

## Resources

### Official Resources
- [BLOOM GitHub Repository](https://github.com/bigscience-workshop/bloom)
- [BLOOM on HuggingFace](https://huggingface.co/bigscience/bloom)
- [BLOOM Research Paper](https://arxiv.org/abs/2211.05100)
- [BigScience Main Website](https://bigscience.huggingface.co/)
- [BigScience on X](https://x.com/BigscienceW)

### Technical Documentation
- [Model Architecture Details](https://github.com/bigscience-workshop/bigscience/tree/master/train/tr11-176B-ml)
- [Training Logs & Tensorboard](https://huggingface.co/bigscience/tr11-176B-ml-logs/tensorboard)
- [Technical Engineering Chronicles](https://github.com/bigscience-workshop/bigscience/blob/master/train/tr11-176B-ml/chronicles.md)

### Blog Posts
- [Architecture & Training Decisions](https://bigscience.huggingface.co/blog/what-language-model-to-train-if-you-have-two-million-gpu-hours)
- [Dataset Creation Process](https://bigscience.huggingface.co/blog/building-a-tb-scale-multilingual-dataset-for-language-modeling)
- [Hardware Engineering Insights](https://bigscience.huggingface.co/blog/which-hardware-to-train-a-176b-parameters-model)