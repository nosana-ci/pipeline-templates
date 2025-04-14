# LangChain4j Mistral (Ollama) Docker Image

This Docker image provides a pre-configured environment to run the [Mistral](https://ollama.ai/library/mistral) language model using [Ollama](https://ollama.ai) and integrate it seamlessly with [LangChain4j](https://github.com/langchain4j/langchain4j) – a powerful framework for building LLM-powered applications in Java.

## 📦 Image Overview

- **Base Image:** `ollama/ollama`
- **Model:** Pre-downloaded [Mistral](https://ollama.ai/library/mistral)
- **Purpose:** Provide a ready-to-run container with the Mistral model for Java developers using LangChain4j.

## 🧠 What is LangChain4j?

LangChain4j simplifies integrating LLMs into Java applications by providing:
- Unified APIs for LLM providers & vector stores
- Tools for prompt templating, chat memory, output parsing, RAG, and more
- Examples and templates for various Java frameworks (Spring Boot, Quarkus, etc.)

For more details, see the [LangChain4j GitHub repository](https://github.com/langchain4j/langchain4j).

## 🚀 Quick Start

To run this container:

```bash
docker run -it --rm -p 11434:11434 langchain4j/ollama-mistral

