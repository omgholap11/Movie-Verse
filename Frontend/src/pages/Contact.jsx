const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[80vh] flex flex-col justify-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
        Connect.
      </h1>
      
      <p className="text-xl text-zinc-400 font-light mb-16 max-w-2xl">
        Inquiries regarding the MovieVerse algorithm, partnership opportunities, or technical architecture.
      </p>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
        <div>
          <h2 className="text-sm font-bold text-white tracking-widest uppercase mb-8 pb-4 border-b border-white/10">Directory</h2>
          
          <ul className="space-y-6 flex flex-col">
            <li>
              <a href="mailto:iomgholap123@gmail.com" className="group flex flex-col md:flex-row md:items-center justify-between text-zinc-400 hover:text-white transition duration-300">
                <span className="font-light tracking-wide">Email</span>
                <span className="font-mono text-sm opacity-50 group-hover:opacity-100">iomgholap123@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/omgholap11" target="_blank" rel="noopener noreferrer" className="group flex flex-col md:flex-row md:items-center justify-between text-zinc-400 hover:text-white transition duration-300">
                <span className="font-light tracking-wide">GitHub</span>
                <span className="font-mono text-sm opacity-50 group-hover:opacity-100">omgholap11</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/om-gholap-4b011b293" target="_blank" rel="noopener noreferrer" className="group flex flex-col md:flex-row md:items-center justify-between text-zinc-400 hover:text-white transition duration-300">
                <span className="font-light tracking-wide">LinkedIn</span>
                <span className="font-mono text-sm opacity-50 group-hover:opacity-100">Profile / Connect</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div className="bg-zinc-950 p-10 border border-white/5 flex flex-col justify-center items-center text-center group hover:border-white/20 transition duration-500">
          <div className="text-4xl text-white mb-6 opacity-30 group-hover:opacity-100 transition duration-500">V.</div>
          <h3 className="text-lg font-bold tracking-widest text-white uppercase mb-2">MovieVerse</h3>
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider">System v2.0</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
