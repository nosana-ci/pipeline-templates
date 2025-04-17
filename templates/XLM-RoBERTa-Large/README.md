# XLM-RoBERTa Large

Facebook AI's multilingual transformer model pretrained on 2.5TB of filtered CommonCrawl data containing 100 languages.

## Key Features
- 561M parameters
- Supports 100 languages
- Excellent for cross-lingual tasks
- Masked language modeling (MLM) objective
- Suitable for classification, token tagging, and QA

## Configuration
- Port: 8080
- GPU: Required (6GB+ VRAM)
- Model: FacebookAI/xlm-roberta-large
- API: Text Embeddings Inference

## Usage

```python
# Get embeddings
url = "http://localhost:8080/embed"
texts = ["Hello world", "Bonjour le monde"]
response = requests.post(url, json={"inputs": texts})
embeddings = response.json()

# Fill mask example
url = "http://localhost:8080/fill-mask"
response = requests.post(url, json={"inputs": "Paris is the <mask> of France."})
```

## Fine-tuning
XLM-RoBERTa is primarily intended to be fine-tuned on downstream tasks. Typical applications include:

1. **Text Classification**: Sentiment analysis, topic classification, or intent detection across multiple languages
2. **Token Classification**: Named entity recognition, part-of-speech tagging
3. **Question Answering**: Cross-lingual question answering systems
4. **Machine Translation**: As a pre-training step for translation systems

## Additional Information
For more details on the XLM-RoBERTa model and its capabilities, visit the [Hugging Face model page](https://huggingface.co/FacebookAI/xlm-roberta-large) or refer to the [original paper](https://arxiv.org/abs/1911.02116). 