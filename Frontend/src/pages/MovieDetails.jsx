import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aiRecs, setAiRecs] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        // Once movie is loaded, trigger AI backend
        if (data && data.title) {
          fetchAiRecommendations(data.title);
        }
      } catch (err) {
        setError("Failed to fetch movie details. Please check your API connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovie();
  }, [id]);

  const fetchAiRecommendations = async (title) => {
    setAiLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const res = await fetch(`${backendUrl}/api/recommend?movie=${encodeURIComponent(title)}`);
      if (res.ok) {
        const data = await res.json();
        // Resolve full TMDB details for the recommendations
        const detailedMovies = await Promise.all(
          data.recommendations.slice(0, 5).map(async (rec) => {
            try { return await fetchMovieDetails(rec.id); } 
            catch(e) { return null; }
          })
        );
        setAiRecs(detailedMovies.filter(m => m !== null));
      }
    } catch(err) {
      console.warn("AI Backend couldn't resolve recommendations for this title.", err);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white opacity-50"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-black text-white text-xl font-light">
        {error || "Movie not found"}
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : '';
    
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/111/fff?text=No+Poster';

  return (
    <div className="w-full bg-black min-h-screen pb-20">
      {/* Cinematic Header */}
      <div className="w-full relative min-h-[60vh] md:min-h-[80vh] flex items-end justify-center overflow-hidden bg-black">
        {backdropUrl && (
          <img src={backdropUrl} className="absolute inset-0 w-full h-full object-cover opacity-20 select-none blur-sm" alt="backdrop" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 flex flex-col md:flex-row gap-10 items-end mt-20">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="w-48 md:w-72 lg:w-80 shadow-2xl border border-white/5 hidden md:block" 
          />
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 leading-tight">{movie.title}</h1>
            {movie.tagline && <p className="text-zinc-400 italic text-xl mb-6 font-light">{movie.tagline}</p>}
            <div className="flex flex-wrap items-center gap-4 text-sm tracking-widest uppercase font-medium mb-8 text-zinc-300">
              <span className="flex items-center gap-1 text-white"><span className="text-white">★</span> {movie.vote_average.toFixed(1)}</span>
              <span className="opacity-30">|</span>
              <span>{movie.runtime} min</span>
              <span className="opacity-30">|</span>
              <span>{movie.release_date?.split('-')[0]}</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {movie.genres.map(g => (
                <span key={g.id} className="text-xs font-semibold tracking-wider uppercase border border-zinc-700 text-zinc-300 px-4 py-1.5 rounded-full bg-zinc-900/50 hover:bg-white hover:text-black hover:border-white transition cursor-default">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 border-b border-white/10 pb-16">
          <div className="lg:col-span-2">
            <SectionTitle>Synopsis</SectionTitle>
            <p className="text-zinc-300 text-lg leading-relaxed font-light mb-16">{movie.overview}</p>

            <SectionTitle>Top Cast</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {movie.credits?.cast?.slice(0, 8).map(actor => (
                <div key={actor.id} className="group">
                  <div className="aspect-[2/3] overflow-hidden bg-zinc-900 border border-white/5 mb-3">
                    <img 
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : 'https://via.placeholder.com/200x300/111/fff?text=No+Photo'} 
                      alt={actor.name} 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h4 className="font-semibold text-white text-sm tracking-wide">{actor.name}</h4>
                  <p className="text-xs text-zinc-500 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-zinc-950 p-8 border border-white/10 sticky top-28 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest text-center">Engine Analysis</h3>
              <div className="w-12 h-1 bg-white mx-auto mb-6"></div>
              <p className="text-zinc-400 text-sm mb-8 text-center font-light leading-relaxed">
                Our Machine Learning model calculates cross-dimensional content traits to find cinema similar to <span className="text-white font-medium">{movie.title}</span>.
              </p>
              <Link 
                to={`/recommendations?query=${encodeURIComponent(movie.title)}`}
                className="block w-full bg-white text-black hover:bg-zinc-200 uppercase tracking-widest font-bold py-4 px-4 text-center text-xs transition duration-300"
              >
                Deep Dive Analysis
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic AI Recommendations Injection */}
        <div className="mt-16">
          <SectionTitle>Similarity Matrix Matches</SectionTitle>
          {aiLoading ? (
            <div className="flex gap-4 items-center text-zinc-500 font-mono text-sm tracking-widest uppercase">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-zinc-500"></div>
              Computing vectors...
            </div>
          ) : aiRecs.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
              {aiRecs.map(rec => (
                <MovieCard key={rec.id} movie={rec} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 font-light italic">No direct vector paths identified for this title yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-white tracking-widest uppercase">{children}</h2>
    <div className="w-8 h-[2px] bg-white mt-4"></div>
  </div>
);

export default MovieDetails;
