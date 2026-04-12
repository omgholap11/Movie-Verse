import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/111/fff?text=No+Poster';

  return (
    <Link to={`/movie/${movie.id}`} className="group relative block overflow-hidden bg-zinc-950 border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 rounded-sm">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img src={imageUrl} alt={movie.title || movie.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 xl:translate-y-4 xl:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end">
          <h3 className="text-sm font-bold text-white mb-2 leading-tight">{movie.title || movie.name}</h3>
          <div className="flex justify-between items-center text-xs font-medium tracking-wide">
            <span className="text-white flex items-center gap-1">
              <span className="text-zinc-300">★</span> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
            <span className="text-zinc-400">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
