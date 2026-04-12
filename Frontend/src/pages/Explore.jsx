import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTrendingMovies, fetchPopularMovies, fetchHindiMovies, fetchMarathiMovies, fetchSouthIndianMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const Explore = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const loaderRef = useRef(null);

  const getCategoryTitle = () => {
    switch(category) {
      case 'trending': return 'Trending WorldWide';
      case 'popular': return 'Popular Classics';
      case 'hindi': return 'Hindi Blockbusters';
      case 'marathi': return 'Marathi Cinema';
      case 'south': return 'South Indian Epics';
      default: return 'Explore';
    }
  };

  const fetchCategoryData = async (pageNumber) => {
    switch(category) {
      case 'trending': return await fetchTrendingMovies(pageNumber);
      case 'popular': return await fetchPopularMovies(pageNumber);
      case 'hindi': return await fetchHindiMovies(pageNumber);
      case 'marathi': return await fetchMarathiMovies(pageNumber);
      case 'south': return await fetchSouthIndianMovies(pageNumber);
      default: return [];
    }
  };

  useEffect(() => {
    // Reset state when category changes
    setMovies([]);
    setPage(1);
    setInitialLoading(true);
  }, [category]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const newMovies = await fetchCategoryData(page);
        if (newMovies && newMovies.length > 0) {
          setMovies(prev => {
            // Filter duplicates which might occur between pages sometimes
            const existingIds = new Set(prev.map(m => m.id));
            const uniqueNew = newMovies.filter(m => !existingIds.has(m.id));
            return [...prev, ...uniqueNew];
          });
        }
      } catch (err) {
        console.error("Failed to load infinite scroll data:", err);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };
    
    loadData();
  }, [category, page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 0.1 });
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="w-full bg-black min-h-screen text-white font-sans pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-16 pb-8 border-b border-white/10 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-zinc-500 font-bold mb-4 block">Endless Database</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">{getCategoryTitle()}</h1>
        </div>

        {initialLoading ? (
          <div className="flex justify-center items-center h-64 opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-8 mb-12">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>
        )}
        
        {/* Intersection Observer Target */}
        <div ref={loaderRef} className="w-full h-20 flex justify-center items-center mt-8">
          {loading && !initialLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-500 opacity-50"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
