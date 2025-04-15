# Data Cleanse Pro - Nosana Job Definition

## Overview
Data Cleanse Pro is a web-based application for data cleaning, preprocessing, and machine learning model training. It provides an intuitive interface for handling both classification and regression tasks, with support for various models and automatic data type detection.

## Quick Start
To run the application using Nosana:

```bash
nosana job post --file job-definition.json --market nvidia-3060
```

Once deployed, the web interface will be available at the provided service URL.

## Features
- **Data Cleaning & Preprocessing**
  - Automatic data type detection (numeric vs categorical)
  - Missing value handling (drop or fill)
  - Feature normalization
  - Categorical variable encoding

- **Machine Learning Models**
  - Classification Models:
    - Logistic Regression
    - Decision Tree
    - Random Forest
    - Support Vector Machine (SVM)
    - K-Nearest Neighbors (KNN)
  
  - Regression Models:
    - Linear Regression
    - Gradient Boosting
    - Support Vector Regression (SVR)

- **Visualizations & Analysis**
  - Feature correlation matrix
  - Distribution plots for each feature
  - Feature importance analysis
  - Model performance metrics
  - Confusion matrix (for classification)
  - Actual vs Predicted plots (for regression)

## Job Definition Details
The job is defined in `job-definition.json` with the following key components:

- **Container Image**: `docker.io/acalculus/data_cleanse_app:latest`
- **Exposed Port**: 5000 (Web Interface)
- **Volumes**:
  - `data-volume`: For uploaded data files
  - `cleaned-volume`: For processed data files

## Data Requirements
- Input: CSV files only
- Minimum rows: 10
- Minimum columns: 2 numeric columns
- Target variable: Last column in the dataset

## Model Selection Guidelines
### Classification Models
- **Logistic Regression**: Best for binary/multi-class outcomes with linear relationships
- **Decision Tree**: Good for mixed feature types and non-linear relationships
- **Random Forest**: Excellent for complex datasets with outliers
- **SVM**: Effective for high-dimensional data
- **KNN**: Best for well-defined group structures

### Regression Models
- **Linear Regression**: Best for linear relationships
- **Gradient Boosting**: Powerful for complex non-linear relationships
- **SVR**: Good for non-linear relationships with kernel flexibility

## Usage Instructions
1. Access the web interface at the provided service URL
2. Upload your CSV file
3. Select columns for cleaning and normalization
4. Choose between classification or regression
5. Select a specific model based on your data characteristics
6. Process the data and view results
7. Download cleaned data, trained model, or performance reports

## Resource Requirements
- CPU: 1 core
- Memory: 2GB
- GPU: Not required
- Storage: Depends on dataset size

## Docker Image
The application is containerized and available on Docker Hub:
```bash
docker pull acalculus/data_cleanse_app:latest
```

## Local Development
To run the application locally:
```bash
docker run -p 5000:5000 acalculus/data_cleanse_app:latest
```
Access the application at http://localhost:5000

## Support
For issues or questions, please create an issue in the repository or contact the author. 