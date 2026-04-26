import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

function RoomCard({ room }) {
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent Link navigation if wrapped
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to save rooms");
        return;
      }
      await axios.post(
        `http://localhost:3001/api/rooms/save/${room.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Room saved successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save room");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 flex flex-col group relative"
    >
      <div className="relative overflow-hidden h-56 bg-gray-100 border-b border-gray-200">
        {/* Top Left Label */}
        <div className="absolute top-4 left-4 bg-white px-2 py-1 z-10 shadow-sm border border-gray-100">
          <p className="text-sm font-bold text-black uppercase tracking-widest">
            {room.room_type || "STUDIO"}
          </p>
        </div>
        
        {/* Top Right Heart */}
        <div 
          onClick={handleSave}
          className="absolute top-4 right-4 bg-white w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black hover:text-red-500 hover:fill-current transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <img
          src={
            room.image
              ? `http://localhost:3001/uploads/${room.image}`
              : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop&grayscale"
          }
          alt="room"
          className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-black line-clamp-1">
            {room.title || "Modern Loft"}
          </h3>
          <p className="text-base text-gray-500 font-medium">
            £{room.rent}<span className="text-sm text-gray-400">/mo</span>
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{room.location || "City Center, Unknown"}</span>
        </div>

        <div className="flex items-center text-base font-bold text-black uppercase tracking-widest gap-6 mt-auto border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            250 SQFT
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {room.vacancies || 1} ROOMMATE{room.vacancies > 1 ? "S" : ""}
          </div>
        </div>
      </div>

      <Link to={`/rooms/${room.id}`} className="mt-auto block">
        <button className="w-full bg-black text-white text-base font-bold uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors">
          View Details
        </button>
      </Link>
    </motion.div>
  );
}

export default RoomCard;