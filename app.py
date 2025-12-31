import streamlit as st
import pickle

movies_dict = pickle.load(open('movies.pkl' , 'rb'))
# print(movies_dict)
movies_list = movies_dict['title'].values
# print(movies_list)

st.title('Movie-Verse')
st.subheader('Personalized Recommendation System')

selected_movie = st.selectbox(
    "Select the Movie" , 
    movies_list
)

if st.button('Recommend'):
    st.write("Your Recommendations are: ")



