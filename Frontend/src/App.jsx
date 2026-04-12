import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Recommendations from './pages/Recommendations';
import About from './pages/About';
import Contact from './pages/Contact';
import Explore from './pages/Explore';

function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-black text-white font-sans w-full selection:bg-white selection:text-black">
      <Navbar />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/:category" element={<Explore />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
