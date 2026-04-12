import pickle
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load machine learning artifacts
try:
    movies_dict = pickle.load(open('../movies.pkl', 'rb'))
    movies = pd.DataFrame(movies_dict)
    similarity = pickle.load(open('../simillarities.pkl', 'rb'))
except Exception as e:
    print("Warning: Could not load machine learning artifacts.", e)

@app.get("/api/recommend")
def recommend_movies(movie: str):
    try:
        # Find index of the movie using partial matching
        matches = movies[movies['title'].str.contains(movie, case=False, na=False)]
        if len(matches) == 0:
            raise IndexError
            
        movie_index = matches.index[0]
        distances = similarity[movie_index]
        
        # Get top 10
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]
        
        recommended_movies = []
        for i in movies_list:
            movie_id = int(movies.iloc[i[0]].movie_id)
            title = str(movies.iloc[i[0]].title)
            recommended_movies.append({"id": movie_id, "title": title})
            
        return {"movie": movie, "recommendations": recommended_movies}
    except IndexError:
        raise HTTPException(status_code=404, detail="Movie not found in database.")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
