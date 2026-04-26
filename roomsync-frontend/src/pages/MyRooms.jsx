import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function MyRooms() {

  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3001/api/rooms/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setRooms(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this room?")) return;

    try {

      await axios.delete(
        `http://localhost:3001/api/rooms/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Room deleted");

      fetchRooms();

    } catch (err) {

      toast.error("Delete failed");

    }

  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <h1 className="text-5xl font-extrabold text-black mb-10 tracking-tight">
          My Rooms
        </h1>

        {rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-32 space-y-6">
            <h2 className="text-xl font-medium text-black">
              You have not posted any rooms yet
            </h2>
            <Link
              to="/post-room"
              className="bg-black text-white text-base font-bold uppercase tracking-widest px-8 py-4 hover:bg-gray-800 transition-colors"
            >
              Post Your First Room
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 flex flex-col group"
              >
                <div className="relative overflow-hidden h-56 bg-gray-100 border-b border-gray-200">
                  <div className="absolute top-4 left-4 bg-white px-2 py-1 z-10 shadow-sm border border-gray-100">
                    <p className="text-sm font-bold text-black uppercase tracking-widest">
                      {room.room_type || "STUDIO"}
                    </p>
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
                      ₹{room.rent}<span className="text-sm text-gray-400">/mo</span>
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span className="truncate">📍 {room.location || "City Center, Unknown"}</span>
                  </div>

                  <div className="flex items-center text-base font-bold text-black uppercase tracking-widest gap-4 mt-auto border-t border-gray-100 pt-4">
                    <span>👤 {room.gender_preference}</span>
                    <span>🛏 {room.vacancies} left</span>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Link
                      to={`/edit-room/${room.id}`}
                      className="flex-1 bg-white border border-black text-black text-base font-bold uppercase tracking-widest py-3 text-center hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="flex-1 bg-black text-white text-base font-bold uppercase tracking-widest py-3 text-center hover:bg-gray-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRooms;