# MobileNetV3 Small

A lightweight and efficient model for image classification and feature extraction, pre-trained on ImageNet.

## Key Features
- 2.5M parameters
- Fast inference (0.1 GMACs)
- Small memory footprint (1.4M activations)
- Designed for mobile and edge devices
- 224 x 224 input size

## Configuration
- Port: 8080
- GPU: Optional (minimal VRAM usage)
- Model: timm/mobilenetv3_small_100.lamb_in1k
- API: TorchServe RESTful API

## Usage

```python
# Classify an image
url = "http://localhost:8080/predictions/mobilenet"
with open("image.jpg", "rb") as img_file:
    img_b64 = base64.b64encode(img_file.read()).decode("utf-8")
response = requests.post(url, json={"data": img_b64})
```

## Management API
TorchServe also provides a management API to register and manage models:

```python
import requests

# Register a new model
register_url = "http://localhost:8081/models"
data = {
    "model_name": "mobilenet_custom",
    "url": "https://path/to/your/model.mar",
    "batch_size": 1,
    "max_batch_delay": 100,
    "initial_workers": 1,
}
response = requests.post(register_url, data=data)

# List models
list_url = "http://localhost:8081/models"
response = requests.get(list_url)
models = response.json()
print(models)
```

## Use Cases
- Mobile and edge device image classification
- Real-time object recognition
- IoT and embedded systems
- Low-latency visual inference
- Energy-efficient deployment scenarios

## Additional Information
For more details on the MobileNetV3 architecture, visit the [Hugging Face model page](https://huggingface.co/timm/mobilenetv3_small_100.lamb_in1k) or refer to the [MobileNetV3 paper](https://arxiv.org/abs/1905.02244). 