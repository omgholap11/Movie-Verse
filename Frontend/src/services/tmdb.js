const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async (page = 1) => {
  if (!API_KEY) throw new Error("TMDB API Key missing");
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const fetchPopularMovies = async (page = 1) => {
  if (!API_KEY) throw new Error("TMDB API Key missing");
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const fetchHindiMovies = async (page = 1) => {
  if (!API_KEY) throw new Error("TMDB API Key missing");
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const fetchMarathiMovies = async (page = 1) => {
  if (!API_KEY) throw new Error("TMDB API Key missing");
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=mr&sort_by=popularity.desc&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const fetchSouthIndianMovies = async (page = 1) => {
  if (!API_KEY) throw new Error("TMDB API Key missing");
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=te|ta|ml|kn&sort_by=popularity.desc&page=${page}`);
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  if (!API_KEY) throw new Error("TMDB API Key missing");
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,similar`);
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  if (!API_KEY) throw new Error("TMDB API Key missing");
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
  const data = await response.json();
  return data.results;
};
