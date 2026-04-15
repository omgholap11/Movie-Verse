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

# 🎬 MovieVerse - AI-Powered Movie Insight and Recommendation Engine

<div align="center">

![MovieVerse Banner](https://img.shields.io/badge/MovieVerse-AI%20Recommendations-E50914?style=for-the-badge&logo=netflix)

**A professional, full-stack movie discovery platform powered by React, FastAPI, and Content-Based Machine Learning.**

[![React](https://img.shields.io/badge/React-18.2+-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?style=flat&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![Streamlit](https://img.shields.io/badge/Legacy_UI-Streamlit-FF4B4B?style=flat&logo=streamlit&logoColor=white)](https://streamlit.io/)

[Live Demo](#-live-demo) • [Features](#-features) • [Installation Options](#-quick-start) • [Tech Stack](#-tech-stack)

</div>

---

## 🌐 Live Demo

Try the cloud-deployed legacy version of MovieVerse! 🚀

[![Open in Hugging Face](https://img.shields.io/badge/🤗-Open%20in%20Hugging%20Face-yellow?style=for-the-badge)](https://huggingface.co/spaces/itzz-omii45/MovieVerse)

**Live Streamlit App:** https://huggingface.co/spaces/itzz-omii45/MovieVerse

---

## 📖 Overview

**MovieVerse** has evolved from a standalone Python script into a robust 2-Tier web application. The platform uses Natural Language Processing (NLP) to analyze movie metadata (genres, keywords, cast, plot) and leverages the **Bag of Words** model along with a pre-computed **Cosine Similarity** matrix to suggest hyper-accurate, personalized cinematic matches. 

The new architecture decouples the resource-heavy Similarity Engine into a Python **FastAPI backend** while delivering a highly professional, cinematic UX via a modern **React + Vite** frontend.

---

## ✨ Features

- 🎯 **Advanced AI Recommendations:** Deep context-based filtering powered by TF-IDF vectorization.
- 🎨 **Cinematic UI/UX:** A stunning, ultra-modern monochrome interface powered by Tailwind CSS.
- 🌏 **Regional Infinite Exploring:** Endless scrolling across Hollywood, Bollywood, Marathi, and South Indian cinema.
- ⚡ **Asynchronous Speed:** Uvicorn/FastAPI backend ensures zero blocking and millisecond vector inferences.
- 🖼️ **Dynamic TMDB Streaming:** All cast profiles, plots, trailers, and HD backdrops fetched securely at runtime.
- 🎭 **Fuzzy NLP Matching:** Robust backend routing seamlessly handles typos and varied search casing.

---

## 🚀 Quick Start

MovieVerse uniquely supports running in two distinct modes. Choose depending on your needs.

### 🥇 Mode 1: The Full-Stack Architecture (Recommended)

Experience the premium UI and decoupled API performance.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/omgholap11/Movie-Verse.git
   cd Movie-Verse
   ```

2. **Configure API Keys**
   Create a `.env` file inside the `Frontend` folder:
   ```bash
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

3. **Start the FastAPI Backend**
   Open a new terminal window:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

4. **Start the React Frontend**
   Open another terminal window:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
   Navigate to `http://localhost:5173` to explore the application!

---

### 🥈 Mode 2: The Minimalist Streamlit Application 

If you do not have Node/React installed or just want to run the legacy single-file architecture:

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure API Keys**
   Create a `.env` file in the root folder:
   ```bash
   TMDB_API_KEY=your_api_key_here
   ```

3. **Run Streamlit**
   ```bash
   streamlit run app.py
   ```
   Navigate to `http://localhost:8501` to view.

---

## 🛠️ Tech Stack

### Frontend Ecosystem
- **React.js 18 + Vite** - Core component rendering and rapid dev server.
- **Tailwind CSS** - Utility styling for responsive layouts.
- **React Router Dom** - Dynamic client-side routing.

### Backend Engine
- **FastAPI / Python** - Asynchronous REST API servicing machine learning data.
- **Pandas & Scikit-Learn** - Core ML data structuring and calculations.
- **Uvicorn** - High-performance ASGI web server.

---

## 📦 Project Structure

```
MovieVerse/
├── Frontend/               # Complete React + Vite Application
│   ├── src/                # UI Components and TMDB Service Hookups
│   ├── index.css           # Global Tailwind Directives
│   └── .env                # React environmental variables (starts with VITE_)
│
├── backend/                # Decoupled Inference API
│   ├── main.py             # FastAPI routing and ML logic
│   └── requirements.txt    # Python dependencies
│
├── app.py                  # Legacy Streamlit single-page application
├── movies.pkl              # Serialized NLP Dataset (Fast load)
├── simillarities.pkl       # 5000x5000 Cosine Similarity matrix (Git LFS)
└── README.md               # Documentation
```

---

## 📧 Contact

**Developer:** Om Gholap  
**Email:** iomgholap123@gmail.com  
**GitHub:** [omgholap11](https://github.com/omgholap11)  
**LinkedIn:** [Om Gholap](https://www.linkedin.com/in/om-gholap-4b011b293)
