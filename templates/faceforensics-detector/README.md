# FaceForensics Detection Template for Nosana

This Nosana template allows you to run deepfake detection on video files using the [FaceForensics](https://github.com/ondyari/FaceForensics) model with EfficientNet.

## 🔍 What It Does

Given a video file, this container runs inference and outputs a JSON file containing deepfake detection results, leveraging GPU acceleration on the Nosana Network.

---

## ⚙️ How It Works

- **Model:** EfficientNet-B0
- **Input:** `/data/input.mp4`
- **Output:** `/data/results.json`
- **Detection Threshold:** `0.7`
- **Runs on GPU:** Yes (minimum: NVIDIA T4, 8GB VRAM)

---

## 🔧 Environment Variables

| Name        | Description                   | Default            |
|-------------|-------------------------------|--------------------|
| `MODEL`     | Detection model to use        | `efficientnet-b0`  |
| `THRESHOLD` | Confidence threshold (0-1)    | `0.7`              |

---

## 📂 Resources & Volumes

| Volume Path | Description            |
|-------------|------------------------|
| `/data`     | Input/output video/data |

---

## ✅ Requirements

- GPU-enabled container
- At least **8GB VRAM** (e.g., NVIDIA T4)
- Internet access to download models (if not preloaded)

---

## 🧪 Example Output

```json
{
  "frames": [
    {"frame": 1, "score": 0.23},
    {"frame": 2, "score": 0.91, "deepfake": true}
  ],
  "summary": {
    "deepfake_frames": 1,
    "total_frames": 2
  }
}
