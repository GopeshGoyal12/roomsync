import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import PopularCities from "../components/PopularCities";
import RoomCard from "../components/RoomCard";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/rooms")
      .then((res) => {
        const roomsData = Array.isArray(res.data)
          ? res.data
          : res.data.rooms || res.data.data || [];
        setRooms(roomsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Popular Cities */}
      <PopularCities />

      {/* Rooms Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-200">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-base md:text-lg text-gray-500 font-bold tracking-widest uppercase mb-2">Latest Listings</p>
            <h2 className="text-6xl md:text-7xl font-extrabold text-black tracking-tight">Available Rooms</h2>
          </div>
          <div className="flex gap-2">
            <button className="border border-gray-300 p-2 text-gray-600 hover:text-black hover:border-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="border border-gray-300 px-4 py-2 text-base font-bold tracking-widest uppercase text-gray-600 hover:text-black hover:border-black transition-colors">
              Filters
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No rooms available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>

      {/* Value Props */}
      <div className="max-w-7xl mx-auto px-6 py-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 bg-white p-10 flex flex-col justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-3xl font-bold text-black mb-3">Verified Members</h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              Every profile and listing undergoes a rigorous verification process to ensure safety and authenticity.
            </p>
          </div>

          <div className="border border-black bg-black p-10 flex flex-col justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="text-3xl font-bold text-white mb-3">Modern Curation</h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              We prioritize spaces with architectural merit and clean design, fostering environments that inspire.
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-10 flex flex-col justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <h3 className="text-3xl font-bold text-black mb-3">Lifestyle Matching</h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              Our algorithm goes beyond budget, matching you with roommates based on lifestyle habits and design values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;