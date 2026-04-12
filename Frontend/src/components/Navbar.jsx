import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black/95 backdrop-blur-md py-5 px-6 md:px-12 border-b border-white/10 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1800px] w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white select-none flex items-center gap-2 transition hover:opacity-80">
          <span className="text-white text-xl">🎬</span> MovieVerse
        </Link>
        <div className="flex gap-8 text-zinc-400 font-medium text-sm tracking-wide uppercase">
          <Link to="/" className="hover:text-white transition duration-300">Home</Link>
          <Link to="/recommendations" className="hover:text-white transition duration-300">Discover</Link>
          <Link to="/about" className="hover:text-white transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-white transition duration-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
