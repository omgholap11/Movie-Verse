import streamlit as st
import pickle
import requests

movies_dict = pickle.load(open('movies.pkl' , 'rb'))
# print(movies_dict)
movies_list = movies_dict['title'].values
# print(movies_list)
simillarity = pickle.load(open('simillarities.pkl' , 'rb'))


def fetch_poster(movie_id):
    response = requests.get('https://api.themoviedb.org/3/movie/{}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US'.format(movie_id))
    data = response.json()
    # print("Data: " , data)
    return "https://image.tmdb.org/t/p/w500/" + data['poster_path']

def recommendations(movie):
    movie_index = movies_dict[movies_dict['title'] == movie].index[0]
    movie_vector = simillarity[movie_index]

    movie_index_list = sorted(list(enumerate(movie_vector)) , reverse=True , key = lambda x : x[1])[1: 6]
    recommended_movies_list = []
    recommended_movies_poster = []
    for i in movie_index_list:
        # poster fetching from the tmdb apis 
        movie_id = movies_dict.iloc[i[0]].movie_id
        # print("Movie_id: " , movie_id)
        movie_poster = fetch_poster(movie_id)
        # print("Movie Poster: " , movie_poster)
        recommended_movies_list.append(movies_dict.iloc[i[0]].title)
        recommended_movies_poster.append(movie_poster)

    return recommended_movies_list , recommended_movies_poster



st.title('Movie-Verse')
st.subheader('Personalized Recommendation System')

selected_movie = st.selectbox(
    "Select the Movie" , 
    movies_list
)
st.write("Your Selected movie: " , selected_movie)

if st.button('Recommend'):
    st.markdown("---")
    st.subheader("🎬 Recommended Movies for You")
    recommended_movie_name , recommended_movie_poster = recommendations(selected_movie)
    
    # Display movies in columns for better visual layout
    cols = st.columns(5)
    
    for idx, col in enumerate(cols):
        with col:
            st.image(recommended_movie_poster[idx], use_container_width=True)
            st.markdown(f"**{recommended_movie_name[idx]}**")
            st.markdown("⭐ Recommended")




