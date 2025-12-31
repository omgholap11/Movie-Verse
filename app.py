import streamlit as st
import pickle
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Validate API key
api_key = os.getenv('TMDB_API_KEY')
if not api_key:
    st.error("⚠️ TMDB_API_KEY not configured. Please add it in Space settings under 'Variables and secrets'.")
    st.stop()

# Page configuration
st.set_page_config(
    page_title="MovieVerse - AI Recommendations",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for sleek black theme
st.markdown("""
    <style>
    /* Black background */
    .stApp {
        background: #000000;
    }
    
    /* Compact header styling */
    .main-header {
        text-align: center;
        padding: 0.5rem 0;
        margin-bottom: 1rem;
    }
    
    .main-title {
        font-size: 2.5rem;
        font-weight: 800;
        background: linear-gradient(45deg, #E50914, #FF6B6B);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        padding: 0;
    }
    
    .subtitle {
        font-size: 0.9rem;
        color: #888888;
        font-weight: 300;
        letter-spacing: 1px;
        margin-top: 0.2rem;
    }
    
    /* Selectbox styling */
    .stSelectbox {
        margin: 0.5rem auto;
        max-width: 600px;
    }
    
    .stSelectbox label {
        color: #ffffff !important;
        font-size: 1rem !important;
    }
    
    /* Button styling */
    .stButton > button {
        background: #E50914;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        padding: 0.6rem 2.5rem;
        border-radius: 5px;
        border: none;
        box-shadow: 0 2px 10px rgba(229, 9, 20, 0.4);
        transition: all 0.3s ease;
        width: 100%;
        max-width: 250px;
        margin: 1rem auto;
        display: block;
    }
    
    .stButton > button:hover {
        background: #F40612;
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(229, 9, 20, 0.6);
    }
    
    /* Section header */
    .section-header {
        text-align: center;
        font-size: 1.8rem;
        color: #ffffff;
        font-weight: 700;
        margin: 1.5rem 0 1rem 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    
    /* Selected movie display */
    .selected-movie {
        text-align: center;
        font-size: 1rem;
        color: #E50914;
        font-weight: 600;
        padding: 0.5rem;
        background: rgba(229, 9, 20, 0.1);
        border: 1px solid rgba(229, 9, 20, 0.3);
        border-radius: 5px;
        margin: 0.5rem auto;
        max-width: 600px;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Reduce top padding */
    .block-container {
        padding-top: 1rem !important;
        padding-bottom: 1rem !important;
    }
    
    /* Movie title styling */
    .movie-title {
        color: #ffffff;
        font-weight: 600;
        font-size: 0.95rem;
        text-align: center;
        margin-top: 0.5rem;
        min-height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    /* Rating badge */
    .rating-badge {
        background: #E50914;
        color: #ffffff;
        padding: 0.25rem 0.7rem;
        border-radius: 3px;
        font-weight: 600;
        font-size: 0.85rem;
        display: inline-block;
        margin-top: 0.3rem;
    }
    
    /* Image styling */
    img {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }
    
    img:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
    }
    </style>
""", unsafe_allow_html=True)

# Load data
movies_dict = pickle.load(open('movies.pkl', 'rb'))
movies_list = movies_dict['title'].values
simillarity = pickle.load(open('simillarities.pkl', 'rb'))


def fetch_poster(movie_id):
    # Get API key from environment variable
    api_key = os.getenv('TMDB_API_KEY')
    
    response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US')
    data = response.json()
        
    # Check if poster_path exists and is not None
    if 'poster_path' in data and data['poster_path']:
        return "https://image.tmdb.org/t/p/w500/" + data['poster_path']
    else:       
        return None


def recommendations(movie):
    movie_index = movies_dict[movies_dict['title'] == movie].index[0]
    movie_vector = simillarity[movie_index]

    # Get top 15 similar movies to ensure we get 5 successful ones
    movie_index_list = sorted(list(enumerate(movie_vector)), reverse=True, key=lambda x: x[1])[1:16]
    recommended_movies_list = []
    recommended_movies_poster = []
    
    for i in movie_index_list:
        # Stop when we have 5 successful recommendations
        if len(recommended_movies_list) >= 5:
            break
            
        movie_id = movies_dict.iloc[i[0]].movie_id
        movie_poster = fetch_poster(movie_id)
        # movie_poster = "https://th.bing.com/th/id/OIP.KNfIqaD92jvecpbxNWWQ4wHaJ4?w=134&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"  ## i am using this default due to the tmdb outage 

        # Only add if poster was successfully fetched
        if movie_poster:
            recommended_movies_list.append(movies_dict.iloc[i[0]].title)
            recommended_movies_poster.append(movie_poster)

    return recommended_movies_list, recommended_movies_poster


# Header - Compact version
st.markdown("""
    <div class="main-header">
        <h1 class="main-title">🎬 MovieVerse</h1>
        <p class="subtitle">AI-Powered Recommendations</p>
    </div>
""", unsafe_allow_html=True)

# Movie selection
selected_movie = st.selectbox(
    "🎯 Choose a movie you love:",
    movies_list,
    index=0
)

# Display selected movie
st.markdown(f'<div class="selected-movie">✨ Selected: <strong>{selected_movie}</strong></div>', unsafe_allow_html=True)

# Center the button
col1, col2, col3 = st.columns([1, 1, 1])
with col2:
    recommend_button = st.button('🎭 Get Recommendations')

# Recommendations section
if recommend_button:
    with st.spinner('🎬 Finding perfect movies for you...'):
        recommended_movie_name, recommended_movie_poster = recommendations(selected_movie)
    
    # Check if we got any recommendations
    if len(recommended_movie_name) > 0:
        st.markdown('<h2 class="section-header">🌟 Your Personalized Recommendations</h2>', unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)
        
        # Display movies in columns (only create columns for available movies)
        cols = st.columns(len(recommended_movie_name))
        
        for idx, col in enumerate(cols):
            with col:
                # Movie poster with hover effect
                st.image(recommended_movie_poster[idx], use_column_width=True)
                
                # Movie title
                st.markdown(f'<div class="movie-title">{recommended_movie_name[idx]}</div>', unsafe_allow_html=True)
                
                # Rating badge
                st.markdown('<div style="text-align: center;"><span class="rating-badge">⭐ Recommended</span></div>', unsafe_allow_html=True)
    else:
        st.error("⚠️ Unable to fetch recommendations at the moment. Please check your internet connection or try again later.")




