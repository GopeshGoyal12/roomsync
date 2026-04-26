import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/find-room', { state: { initialAiQuery: searchQuery } });
    } else {
      navigate('/find-room');
    }
  };

  return (
    <section className="bg-[#FAFAFA] min-h-[600px] flex items-center justify-center py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-gray-100 text-gray-500 text-base font-bold tracking-widest uppercase px-3 py-1 rounded-sm"
          >
            Architectural Integrity
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight text-black"
          >
            Find Your <br />
            Perfect <br />
            <span className="text-gray-400">Roommate.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-2xl max-w-md font-medium leading-relaxed"
          >
            A curated marketplace for modern living. Browse verified listings and connect with individuals who value space, design, and community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center mt-8 max-w-md border border-gray-300 bg-white p-1"
          >
            <div className="pl-4 pr-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter city, neighborhood, or lifestyle..."
              className="flex-1 bg-transparent border-none outline-none text-base text-black placeholder-gray-400 py-3"
            />
            <button 
              onClick={handleSearch}
              className="bg-black text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-8 mt-12 pt-8 border-t border-gray-200"
          >
            <div>
              <p className="text-2xl font-bold text-black">12k+</p>
              <p className="text-base text-gray-500 font-bold tracking-widest uppercase">Listings</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-black">4.9/5</p>
              <p className="text-base text-gray-500 font-bold tracking-widest uppercase">Trust Score</p>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] md:h-[600px] w-full"
        >
          <div className="absolute inset-0 bg-white border border-gray-200 transform translate-x-4 translate-y-4"></div>
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop&grayscale"
            alt="Minimalist living room"
            className="absolute inset-0 w-full h-full object-cover z-10 border border-gray-200"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;