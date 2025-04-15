# Sentiment Analysis API

This project is a sentiment analysis API built with FastAPI and the Hugging Face Transformers library. It processes text input and delivers results in multiple user-friendly formats, including sentiment labels (positive, negative, neutral), confidence scores, emojis, star ratings, and numeric ratings. Containerized with Docker for easy deployment, the API is designed to be flexible and simple to integrate into various applications, such as customer feedback analysis and social media dashboards.
# Key Features:
- Input: Accepts text through a straightforward interface.
- Output Formats: Provides sentiment labels (e.g., positive, negative, neutral), confidence scores, emojis (faces and hands), star ratings, and numeric ratings.
- Technologies: Built with FastAPI, powered by Hugging Face Transformers for sentiment analysis, and containerized with Docker.
- Purpose: Offers a versatile, easy-to-use tool for diverse use cases.
- This version streamlines the original description, eliminates repetition, and emphasizes the API's functionality, technology stack, and adaptability in a concise yet comprehensive way. Let me know if you'd like further adjustments!



## Technologies Used
- **FastAPI**: A modern web framework for building APIs with Python.
- **Hugging Face Transformers**: A library for natural language processing tasks, including sentiment analysis.
- **Docker**: A platform for developing, shipping, and running applications in containers.

## Installation
To set up and run the API locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/machodrone/AI-Sentiment-Analyzer-short-text.git
   cd sentiment-analysis-api
2. **Build the Docker Image**:
   ```bash
   docker build -t sentiment-analysis-multilingual:0.0.3 .
3. **Paste the job-def.json contents into Nosana**
   ```
   https://dashboard.nosana.com/deploy/
   Choose Advanced Builder, paste the job definition, select a GPU with 8GB or more, and click Create Deployment.
4. **Deplyment Page**:
   ```Logs Tab
   Make note of the address that is eventually listed in the Log Tab:
   e.g. https://538qBxRN1EMmB3YAt35tvmPe8JfEZx4n1unrfRtMQCjq.node.k8s.prd.nos.ci
5. **Send a test message**:
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"text": "I love Nosana!"}' https://538qBxRN1EMmB3YAt35tvmPe8JfEZx4n1unrfRtMQCjq.node.k8s.prd.nos.ci/analyze
   you will receive a response with a variety of sentiments to draw from with a confidence score between 0-100 which shows the confidence level of how AI interpreted the text.
6. **Response**:
- bash:
  "label": "positive",
  "confidence": 93,
  "emoji_face": "😊",
  "emoji_hand": "👍",
  "star_rating": "★★★★★",
  "numeric_rating": "5/5"
8. **After your custom processing**:
   ```Processed response samples
   I love Nosana! 5/5
   ★★★★★ "I love Nosana!" --actual client
   I can't curse in the store, but I get it. 👌
   The Movie was cancelled. Unfiar 😞

License
This project is licensed under the MIT License. See the LICENSE file for details.

# Explanation of Approach or Algorithm
- The approach behind this project is centered on simplicity, flexibility, and usability. Here’s how it works and why it’s designed this way:
Purpose: The goal is to provide an accessible interface for sentiment analysis that anyone can use or integrate into their applications. By offering multiple display options, the API meets diverse needs—whether a user wants a quick emoji for a casual app or a detailed star rating for a review platform.

# How It Works: 
The API receives text input through a POST request (e.g., a sentence or paragraph).

- A pre-trained sentiment analysis model (sourced from Hugging Face Transformers) processes the text to determine its sentiment—typically classified as positive, negative, or neutral, along with a confidence score.

- The sentiment result is then mapped to various output formats, such as:

- Labels: "Positive," "Negative," or "Neutral."

- Emojis:  for positive,  for negative, etc.

- Star Ratings: A 1–5 star scale based on sentiment intensity.

- Numeric Scores: A value between 0 and 1 or -1 and 1, depending on the model.

- The user receives these options in the API response, allowing them to choose the format that best fits their application.

# Why This Approach: 
- Ease of Use: The simple interface (powered by FastAPI) makes it straightforward to send text and get results, requiring minimal setup.

- Flexibility: Multiple output formats cater to different contexts, making the tool versatile for developers and end-users alike.

- Efficiency: Using a pre-trained model reduces the need for custom training, speeding up development and deployment.

- This design reflects a thought process focused on creating a practical, adaptable solution. It’s built to handle text analysis effortlessly while giving users the freedom to display sentiment in ways that suit their vibe—whether that’s playful emojis or precise ratings.
