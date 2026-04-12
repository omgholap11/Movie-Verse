import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { fetchMovieDetails, searchMovies } from '../services/tmdb';

const Recommendations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(''); // 'ai' or 'fallback'

  useEffect(() => {
    if (query) {
      fetchRecommendations(query);
      setSearchInput(query);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ query: searchInput });
    }
  };

  const fetchRecommendations = async (movieName) => {
    setLoading(true);
    setError(null);
    setRecommendations([]);
    setMode('');

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const res = await fetch(`${backendUrl}/api/recommend?movie=${encodeURIComponent(movieName)}`);
      
      if (!res.ok) {
        throw new Error("Movie not found in the AI training set.");
      }
      
      const data = await res.json();
      setMode('ai');
      
      const detailedMovies = await Promise.all(
        data.recommendations.map(async (rec) => {
          try {
            return await fetchMovieDetails(rec.id);
          } catch(e) { return null; }
        })
      );
      
      setRecommendations(detailedMovies.filter(m => m !== null));
      
    } catch (err) {
      console.warn(err);
      try {
        const fallbackResults = await searchMovies(movieName);
        setMode('fallback');
        setRecommendations(fallbackResults.slice(0, 10));
        setError("AI Matrix inaccessible. Providing standard TMDB search results.");
      } catch (fallbackErr) {
        setError("Network error. Systems offline.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 min-h-[80vh] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mb-16 text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Discovery Engine</h1>
        <p className="text-zinc-400 font-light max-w-xl text-lg">Input a title to initiate vector analysis across the cinematic database to find matches.</p>
      </div>
      
      <form onSubmit={handleSearch} className="w-full max-w-3xl mb-16 relative mx-auto group">
        <input 
          type="text" 
          placeholder="Enter a known title (e.g., Inception)..." 
          className="w-full py-5 px-8 bg-black border-b-2 border-zinc-800 text-white focus:outline-none focus:border-white transition-colors text-xl font-light placeholder-zinc-700"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white font-bold tracking-widest uppercase text-sm hover:text-zinc-400 transition-colors px-4 border-l border-zinc-800">
          Execute <span className="ml-2 font-light">→</span>
        </button>
      </form>

      {loading && (
        <div className="flex flex-col justify-center items-center h-64 gap-6 opacity-60 w-full text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Processing Vectors...</p>
        </div>
      )}

      {error && !loading && recommendations.length > 0 && (
        <div className="bg-zinc-950 border border-zinc-800 px-6 py-4 mb-12 max-w-3xl mx-auto flex items-center justify-between text-sm w-full">
          <span className="font-mono tracking-wide text-zinc-400">{error}</span>
          <span className="text-xs uppercase tracking-widest font-bold text-white bg-zinc-800 px-2 py-1">Fallback</span>
        </div>
      )}

      {!loading && !error && recommendations.length === 0 && query && (
        <div className="text-center w-full py-24 border border-zinc-800 max-w-3xl mx-auto bg-zinc-950">
          <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest pb-2 border-b border-zinc-800">0 Results found for query: {query}</span>
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="w-full mt-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 border-b border-zinc-800 pb-6 gap-4">
            <h2 className="text-2xl font-light text-zinc-400">
              Analysis Results for <span className="font-bold text-white">"{query}"</span>
            </h2>
            <span className="text-xs text-black bg-white px-3 py-1 uppercase tracking-widest font-bold font-mono text-center">
              Mode: {mode === 'ai' ? 'AI SIMILARITY' : 'SEARCH'}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-6">
            {recommendations.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
