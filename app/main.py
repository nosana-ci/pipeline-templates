from flask import Flask, request, jsonify
from transformers import MarianMTModel, MarianTokenizer

app = Flask(__name__)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    source_lang = data.get("source_lang")
    target_lang = data.get("target_lang")
    text = data.get("text")

    if not source_lang or not target_lang or not text:
        return jsonify({"error": "Missing parameters"}), 400

    model_name = f"Helsinki-NLP/opus-mt-{source_lang}-{target_lang}"
    try:
        tokenizer = MarianTokenizer.from_pretrained(model_name)
        model = MarianMTModel.from_pretrained(model_name)
    except Exception as e:
        return jsonify({"error": f"Model not found for {source_lang} to {target_lang}"}), 500

    inputs = tokenizer(text, return_tensors="pt", padding=True)
    translated = model.generate(**inputs)
    translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)

    return jsonify({"translation": translated_text})

@app.route('/')
def index():
    return "Language Translation API is running!"

if __name__ == '__main__':