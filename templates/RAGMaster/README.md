<p align="center">
  <img src="https://i.ibb.co/RpxnvBGb/image-removebg-preview-2.png" alt="RAGMaster Logo" />
</p>

# RAGMaster Template for Nosana

## Overview

Retrieval-Augmented Generation (RAG) is an AI architecture that combines information retrieval with generative language models. This template sets up a complete RAG environment on the Nosana platform to support document question answering. By integrating a vector database, an embedding model, and a large language model (LLM), the system can “look up” information in your documents before generating answers.

## What is RAG?

RAG empowers AI assistants to:
1. **Retrieve**: Search a knowledge base for relevant documents.
2. **Augment**: Provide this retrieved context to an LLM.
3. **Generate**: Produce accurate, detailed, and context-rich responses.

This approach overcomes limitations of standalone LLMs by:
- Compensating for outdated training data.
- Reducing hallucinations.
- Accessing private or domain-specific information.

## Key Components

### Vector Database
- **Purpose**: Stores document embeddings for semantic search.
- **Technology**: Configured using Chroma.
- **Capabilities**:
  - Stores numerical representations of document chunks.
  - Supports semantic (meaning-based) search rather than simple keyword matching.

### Embedding Model
- **Purpose**: Converts documents into high-dimensional vectors.
- **Model Used**: `sentence-transformers/all-MiniLM-L6-v2`
- **Capabilities**:
  - Optimizes handling of various document lengths.
  - Captures the semantic essence of text for accurate retrieval.

### Large Language Model (LLM)
- **Purpose**: Generates human-like, context-aware responses.
- **Model Used**: `mistralai/Mistral-7B-Instruct-v0.2`
- **Capabilities**:
  - Uses retrieved document chunks as context.
  - Configurable response length, creativity, and other generation parameters.

## How It Works

### Document Ingestion Pipeline
1. **Upload & Process**: Documents are added via the user interface.
2. **Pre-Processing**: Text is extracted, cleaned, and split into manageable chunks.
3. **Embedding**: Each chunk is converted to a vector using the embedding model.
4. **Storage**: The embeddings are stored in the vector database for efficient search.

### Query Processing Pipeline
1. **Question Conversion**: A user question is embedded into a vector.
2. **Search**: This query embedding searches the vector database for relevant document chunks.
3. **Context Provision**: Retrieved chunks are provided as context to the LLM.
4. **Answer Generation**: The LLM generates a comprehensive answer grounded in the context.

## Getting Started

### How to Use Your Template
1. **Deploy the Template on Nosana**:
   - Upload the `job-definition.json` and `info.json` files using the Nosana Dashboard or CLI.
   - Follow the on-screen instructions to deploy your containers (vector database, embedding service, and LLM service).
2. **Verify Deployment**:
   - Check that each component is running (e.g., for me & by default its Chroma on port 8000, embedding API on port 5000 & LLM on port 9000).
   - Use the provided service URLs to ensure connectivity.

### How to Ingest Documents
- **Supported Formats**: Text files (which are TXT, PDF, DOCX) and HTML.
- **Pre-Processing Steps**:
  - Extract raw text from uploaded files.
  - Clean the text.
  - Split text into chunks.
- **Document Upload Methods**:
  - Upload via a web interface or mount a volume containing your documents.
  - Automated ingestion scripts can be configured for bulk document processing.

### How to Query the System
- **Query Syntax**: Users can ask natural language questions such as:
  - “What are the key features of our product?”
  - “How does the new software update improve performance?”
- **Interaction**:
  - The user query is converted to an embedding and used to retrieve the most relevant document chunks.
  - The LLM generates an answer and can also include citations or references to the original documents.
- **Interpreting Responses**: The answer is both human-readable and grounded in the provided context, ensuring accuracy and transparency.

### Configuration Options
- **Vector Database**:
  - Port number, storage limits, and index refresh rates.
- **Embedding Model**:
  - Model selection (default: `all-MiniLM-L6-v2`), chunk size, and embedding normalization.
- **LLM Settings**:
  - Model parameters such as response length, temperature, and prompt formatting.
- **System-Level Options**:
  - Environment variables for API keys, volume mounts for document storage, and logging settings.

## Example Usage

- **Document Ingestion**: Upload a folder of company reports. The system extracts text, creates embeddings, and stores them in the vector database.
- **Query Example**: Ask “What were the main challenges highlighted in the Q3 report?” The system retrieves relevant excerpts and the LLM provides a detailed answer.
- **Configuration Customization**: Adjust the chunk size for very long documents or change the temperature of the LLM for more creative responses.

## Additional Resources

- **Documentation**: [Nosana RAG Template Docs](https://docs.google.com/document/d/1MiIQ1Py7VbgRuOmTxPTQvLlrZq5yTZWX7l1v8mu3YPc/edit?usp=sharing)
- **Support**: Coming soon.

---

*For more in-depth guidance, please refer to the separate User Manual document below.*