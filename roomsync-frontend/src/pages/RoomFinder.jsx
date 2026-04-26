import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function RoomFinder() {
  const location = useLocation();
  const initialAiQuery = location.state?.initialAiQuery || "";
  const hasInitialized = useRef(false);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manual Filters state
  const [filters, setFilters] = useState({
    location: "",
    maxRent: "",
    room_type: ""
  });

  // AI Search state
  const [aiQuery, setAiQuery] = useState(initialAiQuery);
  const [isAiSearching, setIsAiSearching] = useState(false);

  const fetchRooms = () => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.maxRent) queryParams.append("maxRent", filters.maxRent);
    if (filters.room_type) queryParams.append("room_type", filters.room_type);

    axios.get(`http://localhost:3001/api/rooms?${queryParams.toString()}`)
      .then((res) => {
        const roomsData = Array.isArray(res.data) ? res.data : res.data.rooms || res.data.data || [];
        setRooms(roomsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  };

  const performAiSearch = async (query) => {
    setIsAiSearching(true);
    try {
      const res = await axios.post("http://localhost:3001/api/rooms/ai-search", { query });
      const roomsData = Array.isArray(res.data) ? res.data : res.data.rooms || [];
      setRooms(roomsData);
      if (res.data.filtersExtracted) {
        setFilters({
          location: res.data.filtersExtracted.location || "",
          maxRent: res.data.filtersExtracted.maxRent || "",
          room_type: ""
        });
      }
    } catch (err) {
      console.error("AI Search Error:", err);
      fetchRooms();
    }
    setIsAiSearching(false);
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      if (initialAiQuery) {
        performAiSearch(initialAiQuery);
      } else {
        fetchRooms();
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchRooms();
  };

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    performAiSearch(aiQuery);
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-32 font-sans text-black">
      
      {/* Hero Section */}
      <section className="px-6 max-w-5xl mx-auto flex flex-col items-center text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-12 uppercase">
          DEFINE YOUR <br/>
          <span className="text-transparent" style={{ WebkitTextStroke: "2px black" }}>HABITAT.</span>
        </h1>
        
        <form onSubmit={handleAiSearch} className="w-full max-w-4xl relative">
          <div className="flex items-center border border-black bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <span className="material-symbols-outlined text-gray-400 mx-4">search</span>
            <input 
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-base md:text-lg placeholder:text-gray-300 font-light" 
              placeholder="A quiet loft in Brooklyn for under $3500..." 
              type="text"
            />
            <button disabled={isAiSearching} type="submit" className="bg-black text-white px-6 md:px-10 py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-70 ml-2">
              {isAiSearching ? "..." : "Find"}
            </button>
          </div>
        </form>
      </section>

      {/* Filters Bar */}
      <section className="border-y border-black/10 bg-white sticky top-[95px] z-40 mb-16">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <form onSubmit={applyFilters} className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold hidden sm:inline">LOCATION:</span>
              <input 
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="border border-black px-4 py-2 text-[10px] uppercase tracking-wider w-32 md:w-40 outline-none"
                placeholder="NEW YORK, NY"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold hidden sm:inline">BUDGET:</span>
              <input 
                type="number"
                name="maxRent"
                value={filters.maxRent}
                onChange={handleFilterChange}
                className="border border-black px-4 py-2 text-[10px] uppercase tracking-wider w-32 md:w-40 outline-none"
                placeholder="$2500"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold hidden sm:inline">TYPE:</span>
              <select 
                name="room_type"
                value={filters.room_type}
                onChange={handleFilterChange}
                className="border border-black px-4 py-2 text-[10px] uppercase tracking-wider w-32 md:w-40 outline-none bg-white cursor-pointer"
              >
                <option value="">LOFT / STUDIO</option>
                <option value="Single">SINGLE</option>
                <option value="Shared">SHARED</option>
              </select>
            </div>
            <button type="submit" className="hidden"></button>
          </form>
          
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-500 transition-colors">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            ADVANCED
          </button>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-32 border border-black/10 bg-white">
            <h3 className="text-2xl font-bold mb-2 uppercase">No Habitats Found</h3>
            <p className="text-gray-500 font-light">Try adjusting your filters or consulting the AI Concierge.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="border border-black/20 bg-white flex flex-col group hover:border-black transition-colors duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={room.image ? `http://localhost:3001/uploads/${room.image}` : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop&grayscale"} 
                    alt={room.title}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {index % 3 === 0 ? "NEW" : index % 3 === 1 ? "MEMBER ONLY" : "FEATURED"}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 pr-4">
                      <h3 className="text-xl font-bold uppercase leading-tight tracking-wide line-clamp-2 mb-2">
                        {room.title || "THE CONCRETE LOFT"}
                      </h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold line-clamp-2">
                        {room.location || "WILLIAMSBURG, BROOKLYN"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold tracking-tight">${room.rent?.toLocaleString() || "4,200"}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex gap-8 py-5 border-t border-black/10">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-gray-600">straighten</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800">1,250 SQFT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-gray-600">group</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800">
                          {room.vacancies || 2} ROOMMATE{room.vacancies !== 1 ? 'S' : ''}
                        </span>
                      </div>
                    </div>
                    
                    <Link to={`/rooms/${room.id}`} className="w-full block">
                      <button className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24 px-6 relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">COULDN'T FIND THE ONE?</h2>
            <p className="text-gray-400 font-light text-lg">
              Our proprietary AI algorithm scans off-market listings and architectural archives to find your exact match.
            </p>
          </div>
          <button className="bg-white text-black px-10 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-3 whitespace-nowrap">
            ENABLE DEEP SEARCH
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          </button>
        </div>
      </section>

    </div>
  );
}

export default RoomFinder;
