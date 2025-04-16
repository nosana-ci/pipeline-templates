# TabTransformer

A transformer-based model for tabular data classification.

## Overview
TabTransformer uses self-attention mechanisms to improve learning from structured data with both numerical and categorical features.

## Architecture
- Categorical features are encoded into embeddings
- Embeddings pass through transformer blocks
- Resulting contextual embeddings are concatenated with numerical features
- Final MLP layer produces classification output

## Use Cases
- Binary and multi-class classification on tabular data
- Works with both supervised and semi-supervised tasks
- Census income prediction (demo dataset)

## Requirements
- GPU: 8GB+ VRAM
- TensorBoard interface on port 6006

Implementation based on work by Khalid Salama in the Keras.io examples.

[GitHub Repository](https://github.com/keras-team/keras-io) 