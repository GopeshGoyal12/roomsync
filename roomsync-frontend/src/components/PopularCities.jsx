import { motion } from "framer-motion";

function PopularCities() {
  const cities = [
    {
      name: "NEW YORK",
      rooms: "2,450 AVAILABLE ROOMS",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop&grayscale",
      className: "col-span-12 md:col-span-8 h-[300px] md:h-[400px]"
    },
    {
      name: "LONDON",
      rooms: "1,120 ROOMS",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop&grayscale",
      className: "col-span-12 md:col-span-4 h-[300px] md:h-[400px]"
    },
    {
      name: "BERLIN",
      rooms: "850 ROOMS",
      image: "https://images.unsplash.com/photo-1560930950-5cc20e80e392?q=80&w=1000&auto=format&fit=crop&grayscale",
      className: "col-span-12 md:col-span-4 h-[300px] md:h-[400px]"
    },
    {
      name: "PARIS",
      rooms: "1,640 ROOMS",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop&grayscale",
      className: "col-span-12 md:col-span-8 h-[300px] md:h-[400px]"
    }
  ];

  return (
    <div className="bg-[#FAFAFA] py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-base md:text-lg text-gray-500 font-bold tracking-widest uppercase mb-2">Curated Locations</p>
            <h2 className="text-6xl md:text-7xl font-extrabold text-black tracking-tight">Popular Cities</h2>
          </div>
          <button className="text-base md:text-lg text-gray-500 font-bold tracking-widest uppercase border-b border-gray-300 pb-1 hover:text-black hover:border-black transition-colors">
            View All Cities
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 0.99 }}
              className={`relative bg-gray-200 overflow-hidden cursor-pointer group ${city.className}`}
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="absolute bottom-0 left-0 bg-white p-6 md:p-8 min-w-[200px] border-t border-r border-gray-200 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-black font-extrabold text-xl tracking-wide">{city.name}</h3>
                <p className="text-sm text-gray-500 font-bold tracking-widest uppercase mt-2">{city.rooms}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCities;