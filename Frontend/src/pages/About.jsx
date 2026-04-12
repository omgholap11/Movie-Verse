const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 pb-40 min-h-screen">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-16 underline decoration-white/20 underline-offset-[20px]">
        The Engine.
      </h1>
      
      <div className="space-y-16 text-lg text-zinc-400 font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-white tracking-widest uppercase mb-6 flex items-center gap-4">
            <span className="text-zinc-600">01</span> Architecture
          </h2>
          <p className="mb-6">
            MovieVerse is constructed upon a high-performance Content-Based Recommendation algorithm. It foregoes traditional collaborative filtering in favor of deep structural metadata analysis—processing genres, keywords, cast profiles, directorial history, and narrative synopses.
          </p>
          <p>
            By distilling these features into robust natural language tags, the system utilizes <strong className="text-white font-medium">Bag of Words</strong> vectorization to map cinematic properties geometrically. A subsequent <strong className="text-white font-medium">Cosine Similarity</strong> calculation across our matrix derives the closest mathematical neighbors to any selected film.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white tracking-widest uppercase mb-6 flex items-center gap-4">
            <span className="text-zinc-600">02</span> Technology
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="border border-white/10 p-8 bg-zinc-950 hover:border-white/30 transition-colors">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Frontend Layer</h3>
              <ul className="space-y-3 text-sm text-zinc-500 font-mono">
                <li>React UI Framework</li>
                <li>Tailwind CSS Protocol</li>
                <li>Vite Build System</li>
                <li>React Router DOM</li>
              </ul>
            </div>
            <div className="border border-white/10 p-8 bg-zinc-950 hover:border-white/30 transition-colors">
              <h3 className="text-white font-bold tracking-widest uppercase text-sm mb-4">Backend Layer</h3>
              <ul className="space-y-3 text-sm text-zinc-500 font-mono">
                <li>Python 3.x Environment</li>
                <li>FastAPI Framework</li>
                <li>Pandas Data Structuring</li>
                <li>Scikit-Learn Vectorization</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
