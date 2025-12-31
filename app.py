import streamlit as st
import pickle

movies_dict = pickle.load(open('movies.pkl' , 'rb'))
# print(movies_dict)
movies_list = movies_dict['title'].values
# print(movies_list)
simillarity = pickle.load(open('simillarities.pkl' , 'rb'))

def recommendations(movie):
    movie_index = movies_dict[movies_dict['title'] == movie].index[0]
    movie_vector = simillarity[movie_index]

    movie_index_list = sorted(list(enumerate(movie_vector)) , reverse=True , key = lambda x : x[1])[1: 6]
    recommended_movies_list = []
    for i in movie_index_list:
        recommended_movies_list.append(movies_dict.iloc[i[0]].title)
    return recommended_movies_list


st.title('Movie-Verse')
st.subheader('Personalized Recommendation System')

selected_movie = st.selectbox(
    "Select the Movie" , 
    movies_list
)
st.write("Your Selected movie: " , selected_movie)

if st.button('Recommend'):
    st.write("Your Recommendations are: ")
    movie_recommendations = recommendations(selected_movie)
    for i in movie_recommendations:
        st.write(i)




