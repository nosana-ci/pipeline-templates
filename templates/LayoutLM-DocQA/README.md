# LayoutLM Document QA

A multimodal document question answering model for extracting information from documents, invoices, and images.

## Overview
LayoutLM-Document-QA combines layout information with text to understand document structure and answer questions about document content. It has been fine-tuned on SQuAD2.0 and DocVQA datasets.

## Capabilities
- Extract specific information from documents (invoices, receipts, forms)
- Answer questions about document content
- Process both digital PDFs and scanned document images
- Understand spatial layout for better information extraction

## Example Use Cases
- Invoice data extraction (invoice numbers, amounts, dates)
- Financial statement analysis
- Form processing
- Receipt information extraction
- Document data mining

## Requirements
- CPU-only deployment (no GPU required)
- Web interface on port 7860
- Requires pytesseract for OCR functionality

## Model Details
Size: 128M parameters
License: MIT
Created by Impira 