# 🎬 MovieVerse - AI-Powered Movie Recommendation System

<div align="center">

![MovieVerse Banner](https://img.shields.io/badge/MovieVerse-AI%20Recommendations-E50914?style=for-the-badge&logo=netflix)

**An intelligent movie recommendation system powered by Machine Learning and Content-Based Filtering**

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.28+-FF4B4B?style=flat&logo=streamlit&logoColor=white)](https://streamlit.io/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?style=flat&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [How It Works](#-how-it-works)

</div>

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
- 🌐 **Error Handling** - Graceful fallbacks for network issues

---

## 🎥 Demo

### Main Interface
The app features a clean, minimalist design with a powerful recommendation engine underneath.

**Key Interactions:**
1. Select your favorite movie from the dropdown
2. Click "Get Recommendations"
3. View 5 personalized movie suggestions with posters

---

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/MovieVerse.git
   cd MovieVerse
   ```

2. **Create Virtual Environment** (Recommended)
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```bash
   # .env
   TMDB_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual TMDB API key.

5. **Run the Application**
   ```bash
   streamlit run app.py
   ```

6. **Access the App**
   
   Open your browser and navigate to:
   ```
   http://localhost:8501
   ```

---

## 📦 Project Structure

```
MovieVerse/
│
├── app.py                  # Main Streamlit application
├── movies.pkl              # Preprocessed movie dataset
├── simillarities.pkl       # Precomputed similarity matrix
├── .env                    # Environment variables (API keys)
├── .gitignore             # Git ignore file
├── requirements.txt        # Python dependencies
└── README.md              # Project documentation
```

### File Descriptions

| File | Description |
|------|-------------|
| `app.py` | Main application with UI and recommendation logic |
| `movies.pkl` | Serialized DataFrame containing movie metadata |
| `simillarities.pkl` | Precomputed cosine similarity matrix (5000×5000) |
| `.env` | Stores sensitive API keys securely |

---

## 🛠️ Tech Stack

### Frontend
- **Streamlit** - Interactive web framework for Python
- **HTML/CSS** - Custom styling for Netflix-inspired UI
- **JavaScript** - Embedded for dynamic interactions

### Backend & ML
- **Python 3.8+** - Core programming language
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computations
- **Scikit-learn** - Machine learning algorithms
- **NLTK** - Natural Language Processing

### APIs & Services
- **TMDB API** - Movie metadata and poster images
- **Python-dotenv** - Environment variable management

### Data Processing
- **Pickle** - Model serialization and deserialization
- **Requests** - HTTP requests for API calls

---

## 🧠 How It Works

### 1. **Data Collection**
The system uses the **TMDB 5000 Movie Dataset** from Kaggle, containing:
- Movie titles, overviews, genres, keywords
- Cast, crew, and production details
- Ratings and popularity metrics

### 2. **Feature Engineering**

**Text Preprocessing:**
```python
# Combine relevant features into a single text field
movies['tags'] = movies['overview'] + ' ' + movies['genres'] + ' ' + movies['keywords'] + ' ' + movies['cast'] + ' ' + movies['crew']

# Clean and preprocess text
movies['tags'] = movies['tags'].apply(lambda x: x.lower())
movies['tags'] = movies['tags'].apply(remove_stopwords)
movies['tags'] = movies['tags'].apply(stem_words)
```

### 3. **Vectorization - Bag of Words**

The **Bag of Words (BoW)** model converts text into numerical vectors:

```python
from sklearn.feature_extraction.text import CountVectorizer

cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(movies['tags']).toarray()
```

**How BoW Works:**
- Creates a vocabulary of the top 5000 most frequent words
- Each movie is represented as a vector of word counts
- Example: `[0, 3, 0, 1, 5, ...]` where each position represents a word

### 4. **Similarity Computation - Cosine Similarity**

**Cosine Similarity** measures the angle between two vectors:

```python
from sklearn.metrics.pairwise import cosine_similarity

similarity = cosine_similarity(vectors)
```

**Mathematical Formula:**
```
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
```

**Why Cosine Similarity?**
- Range: 0 (completely different) to 1 (identical)
- Ignores magnitude, focuses on orientation
- Perfect for text similarity in high-dimensional space

### 5. **Recommendation Algorithm**

```python
def recommendations(movie):
    # Find movie index
    movie_index = movies[movies['title'] == movie].index[0]
    
    # Get similarity scores
    distances = similarity[movie_index]
    
    # Sort and get top 5 similar movies
    movies_list = sorted(list(enumerate(distances)), 
                        reverse=True, 
                        key=lambda x: x[1])[1:6]
    
    return [movies.iloc[i[0]].title for i in movies_list]
```

### 6. **Poster Fetching**

Real-time poster retrieval from TMDB API:

```python
def fetch_poster(movie_id):
    api_key = os.getenv('TMDB_API_KEY')
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}'
    )
    data = response.json()
    return "https://image.tmdb.org/t/p/w500/" + data['poster_path']
```

---

## 📊 Model Training Process

### Dataset Preparation

1. **Download Dataset**
   - Source: [TMDB 5000 Movie Dataset (Kaggle)](https://www.kaggle.com/tmdb/tmdb-movie-metadata)
   - Files: `tmdb_5000_movies.csv`, `tmdb_5000_credits.csv`

2. **Data Cleaning**
   ```python
   # Remove duplicates
   movies = movies.drop_duplicates(subset='title')
   
   # Handle missing values
   movies['overview'].fillna('', inplace=True)
   
   # Parse JSON columns
   movies['genres'] = movies['genres'].apply(convert_json)
   ```

3. **Feature Selection**
   ```python
   features = ['movie_id', 'title', 'overview', 'genres', 
               'keywords', 'cast', 'crew']
   movies = movies[features]
   ```

### Training Pipeline

```python
# 1. Create tags
movies['tags'] = create_tags(movies)

# 2. Vectorization
cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(movies['tags']).toarray()

# 3. Compute similarity matrix
similarity = cosine_similarity(vectors)

# 4. Save models
pickle.dump(movies, open('movies.pkl', 'wb'))
pickle.dump(similarity, open('simillarities.pkl', 'wb'))
```

---

## 🎯 Usage

### Basic Usage

1. **Select a Movie**
   - Use the dropdown to choose from 5000+ movies
   - Search by typing the movie name

2. **Get Recommendations**
   - Click the "🎭 Get Recommendations" button
   - Wait for the AI to process (usually < 1 second)

3. **Explore Results**
   - View 5 personalized recommendations
   - See movie posters and titles
   - Hover over cards for interactive effects

### API Key Setup

**Get Your TMDB API Key:**

1. Go to [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API key (free)
5. Copy your API key
6. Add to `.env` file:
   ```
   TMDB_API_KEY=your_actual_api_key_here
   ```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TMDB_API_KEY` | Your TMDB API key for fetching posters | Yes |

### Customization

**Change Number of Recommendations:**
```python
# In app.py, line ~180
movie_index_list = sorted(...)[1:6]  # Change 6 to desired number + 1
```

**Modify UI Colors:**
```python
# In app.py, CSS section
background: #E50914;  # Netflix red - change to your color
```

---

## 🐛 Troubleshooting

### Common Issues

**1. API Key Error**
```
Error: 'poster_path' key not found
```
**Solution:** Check your `.env` file and ensure `TMDB_API_KEY` is set correctly.

**2. Import Error**
```
ModuleNotFoundError: No module named 'streamlit'
```
**Solution:** Install dependencies: `pip install -r requirements.txt`

**3. Pickle File Error**
```
FileNotFoundError: movies.pkl not found
```
**Solution:** Ensure `movies.pkl` and `simillarities.pkl` are in the same directory as `app.py`.

---

## 📈 Performance

- **Dataset Size:** 5000 movies
- **Similarity Matrix:** 5000 × 5000 = 25M comparisons
- **Average Response Time:** < 1 second
- **Memory Usage:** ~180 MB (similarity matrix)
- **API Calls:** 5 per recommendation request

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **TMDB** - For providing the comprehensive movie database API
- **Kaggle** - For hosting the TMDB 5000 Movie Dataset
- **Streamlit** - For the amazing web framework
- **Scikit-learn** - For machine learning tools

---

## 📧 Contact

**Developer:** Om Gholap 
**Email:** iomgholap123@gmail.com  
**GitHub:** [@omgholap11](https://github.com/omgholap11)  
**LinkedIn:** [Om Gholap](https://www.linkedin.com/in/om-gholap-4b011b293)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

</div>
