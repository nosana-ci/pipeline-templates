# DETR ResNet-101 DC5

End-to-End Object Detection with Transformers model with ResNet-101 backbone.

## Overview
DETR (DEtection TRansformer) is an object detection model that uses a transformer architecture to directly predict object classes and bounding boxes in an image.

## Architecture
- ResNet-101 backbone with dilated C5 stage
- Transformer encoder-decoder
- Two heads: one for class prediction, another MLP for bounding box coordinates
- Uses "object queries" to detect up to 100 objects per image

## Performance
- Trained on COCO 2017 dataset (118k annotated images)
- Achieves 44.9 AP (Average Precision) on COCO validation set
- End-to-end architecture eliminates the need for hand-crafted components like anchor generation

## Requirements
- GPU: 12GB+ VRAM
- Web interface on port 7860

Developed by Facebook AI Research (now Meta AI). [Original paper](https://arxiv.org/abs/2005.12872) 