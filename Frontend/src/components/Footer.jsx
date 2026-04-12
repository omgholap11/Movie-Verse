const Footer = () => {
  return (
    <footer className="bg-black/90 py-10 border-t border-white/10 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-zinc-600">
        <p>© {new Date().getFullYear()} MovieVerse Platform.</p>
        <div className="flex items-center gap-6 text-[10px] md:text-xs">
          <span>React UI Framework</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
          <span>FastAPI Engine</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
