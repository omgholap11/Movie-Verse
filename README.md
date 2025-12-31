---
title: MovieVerse
emoji: 🎬
colorFrom: red
colorTo: purple
sdk: streamlit
sdk_version: 1.31.0
app_file: app.py
pinned: false
---

# 🎬 MovieVerse - AI-Powered Movie Recommendation System

<div align="center">

![MovieVerse Banner](https://img.shields.io/badge/MovieVerse-AI%20Recommendations-E50914?style=for-the-badge&logo=netflix)

**An intelligent movie recommendation system powered by Machine Learning and Content-Based Filtering**

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.31+-FF4B4B?style=flat&logo=streamlit&logoColor=white)](https://streamlit.io/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?style=flat&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![Hugging Face](https://img.shields.io/badge/🤗-Hugging%20Face-yellow)](https://huggingface.co/spaces/itzz-omii45/MovieVerse)

[Live Demo](https://huggingface.co/spaces/itzz-omii45/MovieVerse) • [Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [How It Works](#-how-it-works)

</div>

---

## 🌐 Live Demo

**Try MovieVerse now!** 🚀

[![Open in Hugging Face](https://img.shields.io/badge/🤗-Open%20in%20Hugging%20Face-yellow?style=for-the-badge)](https://huggingface.co/spaces/itzz-omii45/MovieVerse)

**Live App:** https://huggingface.co/spaces/itzz-omii45/MovieVerse

---

## 📖 Overview

**MovieVerse** is a content-based movie recommendation system that suggests personalized movies based on your preferences. Using advanced Natural Language Processing (NLP) techniques and machine learning algorithms, MovieVerse analyzes movie metadata to find the most similar films you'll love.

The system leverages the **Bag of Words** model and **Cosine Similarity** to compute relationships between movies, providing accurate and relevant recommendations in a sleek, Netflix-inspired user interface.

---

## ✨ Features

- 🎯 **Personalized Recommendations** - Get 5 tailored movie suggestions based on your selection
- 🎨 **Modern UI/UX** - Sleek black theme with Netflix-inspired design
- 🖼️ **Dynamic Posters** - Real-time movie poster fetching from TMDB API
- ⚡ **Fast Performance** - Optimized similarity computation using pre-trained models
- 🔒 **Secure Configuration** - Environment-based API key management
- 📱 **Responsive Design** - Works seamlessly across all devices
- 🎬 **Interactive Cards** - Hover effects and smooth animations
- 🌐 **Cloud Deployment** - Hosted on Hugging Face Spaces

---

## 🚀 Quick Start

### Try it Online
Visit the live demo: **[MovieVerse on Hugging Face](https://huggingface.co/spaces/itzz-omii45/MovieVerse)**

### Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/omgholap11/Movie-Verse.git
   cd Movie-Verse
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up API Key**
   
   Create a `.env` file:
   ```bash
   TMDB_API_KEY=your_api_key_here
   ```
   
   Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)

4. **Run the App**
   ```bash
   streamlit run app.py
   ```

5. **Open in Browser**
   ```
   http://localhost:8501
   ```

---

## 🛠️ Tech Stack

### Frontend
- **Streamlit** - Interactive web framework
- **HTML/CSS** - Custom Netflix-inspired styling

### Backend & ML
- **Python 3.8+** - Core programming language
- **Pandas** - Data manipulation
- **NumPy** - Numerical computations
- **Scikit-learn** - Machine learning algorithms
- **Cosine Similarity** - Recommendation algorithm

### APIs & Services
- **TMDB API** - Movie metadata and posters
- **Hugging Face Spaces** - Cloud deployment platform
- **Git LFS** - Large file storage for ML models

---

## 🧠 How It Works

### 1. **Data Processing**
- Uses **TMDB 5000 Movie Dataset** from Kaggle
- Combines movie features (genres, cast, crew, keywords) into text tags
- Preprocesses text (lowercase, remove stopwords, stemming)

### 2. **Vectorization**
- **Bag of Words (BoW)** model converts text to numerical vectors
- Creates vocabulary of top 5000 most frequent words
- Each movie represented as a vector of word counts

### 3. **Similarity Computation**
- **Cosine Similarity** measures angle between movie vectors
- Formula: `cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)`
- Generates 5000×5000 similarity matrix

### 4. **Recommendations**
- Finds movies with highest similarity scores
- Returns top 5 most similar movies
- Fetches posters in real-time from TMDB API

---

## 📦 Project Structure

```
MovieVerse/
├── app.py                  # Main Streamlit application
├── movies.pkl              # Preprocessed movie dataset (2.28 MB)
├── simillarities.pkl       # Similarity matrix (176 MB - Git LFS)
├── requirements.txt        # Python dependencies
├── .env                    # API keys (local only)
├── .gitignore             # Git ignore rules
├── .gitattributes         # Git LFS configuration
├── .huggingface/          # Hugging Face Space config
└── README.md              # Documentation
```

---

## 🌟 Deployment

### Hugging Face Spaces

This project is deployed on **Hugging Face Spaces** using:

- **SDK:** Streamlit
- **Hardware:** CPU (free tier)
- **Git LFS:** For large pickle files (similarity matrix)
- **Secrets:** TMDB API key stored securely

**Deployment Steps:**
1. Created Hugging Face Space with Streamlit SDK
2. Configured Git LFS for large files (`*.pkl`)
3. Added YAML frontmatter to README for Space configuration
4. Pushed code with `git push hf main`
5. Added `TMDB_API_KEY` as a secret in Space settings

**Live URL:** https://huggingface.co/spaces/itzz-omii45/MovieVerse

---

## 🎯 Usage

1. **Select a Movie** - Choose from 5000+ movies in the dropdown
2. **Get Recommendations** - Click the "🎭 Get Recommendations" button
3. **Explore Results** - View 5 personalized movie suggestions with posters
4. **Hover & Interact** - Enjoy smooth animations and hover effects

---

## 📈 Performance

- **Dataset:** 5000 movies
- **Similarity Matrix:** 5000 × 5000 = 25M comparisons
- **Response Time:** < 1 second
- **Memory Usage:** ~180 MB (similarity matrix)
- **API Calls:** 5 per recommendation request

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **TMDB** - Movie database and API
- **Kaggle** - TMDB 5000 Movie Dataset
- **Streamlit** - Web framework
- **Hugging Face** - Deployment platform
- **Scikit-learn** - ML tools

---

## 📧 Contact

**Developer:** Om Gholap  
**Email:** iomgholap123@gmail.com  
**GitHub:** [omgholap11](https://github.com/omgholap11)  
**LinkedIn:** [Om Gholap](https://www.linkedin.com/in/om-gholap-4b011b293)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

**[Try MovieVerse Live](https://huggingface.co/spaces/itzz-omii45/MovieVerse)** 🎬

</div>
