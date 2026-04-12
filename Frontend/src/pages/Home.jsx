import { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchPopularMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trendingMovies, popularMovies] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies()
        ]);
        
        setTrending(trendingMovies);
        setPopular(popularMovies);
        
        // Set a trending movie as the hero background if it has a backdrop
        if (trendingMovies && trendingMovies.length > 0) {
          const moviesWithBackdrops = trendingMovies.filter(m => m.backdrop_path);
          if (moviesWithBackdrops.length > 0) {
            setHeroImage(`https://image.tmdb.org/t/p/original${moviesWithBackdrops[0].backdrop_path}`);
          }
        }
      } catch (error) {
        console.error("Failed to load movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/recommendations?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="w-full bg-black min-h-screen text-white font-sans">
      {/* Hero Section */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden py-20">
        {heroImage ? (
          <img src={heroImage} alt="Featured Movie" className="absolute inset-0 w-full h-full object-cover opacity-40 select-none transition-opacity duration-1000 blur-[1px]" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-60"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-5xl flex flex-col items-center mt-10">
          <span className="text-xs tracking-[0.4em] text-white/80 uppercase mb-8 font-semibold backdrop-blur-md bg-white/10 py-2 px-6 rounded-full border border-white/20 shadow-xl">The Ultimate Movie Insight Engine</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tighter drop-shadow-2xl">
            Discover Your Next <br className="hidden md:block" /> Cinematic Masterpiece.
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-12 font-light leading-relaxed drop-shadow-md">
            Explore a vast library of films, delve into deep analytics, and receive unparalleled AI-driven recommendations tailored exclusively for you.
          </p>
          
          <form onSubmit={handleSearch} className="w-full max-w-3xl relative flex items-center rounded-full ring-1 ring-white/30 bg-black/40 backdrop-blur-xl hover:ring-white/50 focus-within:ring-white focus-within:bg-black/60 transition-all shadow-2xl shadow-black">
            <input 
              type="text" 
              placeholder="Search for a movie title..." 
              className="w-full py-6 px-10 rounded-full bg-transparent text-white placeholder-zinc-400 focus:outline-none text-xl font-light"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="absolute right-3 bg-white text-black hover:bg-zinc-300 px-10 py-4 rounded-full font-bold uppercase tracking-wide text-sm transition duration-300 shadow-xl">
              Analyze
            </button>
          </form>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 relative z-20 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Trending Now</h2>
            <p className="text-zinc-400 font-light text-lg">The most popular films worldwide, updated daily.</p>
          </div>
          <button className="hidden md:block mt-4 md:mt-0 px-6 py-2 border border-white/20 rounded-full text-sm font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-black transition duration-300">
            Explore All
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64 opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {trending.slice(0, 10).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* Popular Section */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24 relative z-20 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Popular Classics</h2>
            <p className="text-zinc-400 font-light text-lg">Highly acclaimed movies matching your taste.</p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64 opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {popular.slice(0, 10).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
