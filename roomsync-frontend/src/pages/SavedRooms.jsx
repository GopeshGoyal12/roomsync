import { useEffect, useState } from "react";
import axios from "axios";

import RoomCard from "../components/RoomCard";

function SavedRooms() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchSavedRooms = async () => {

      try {

        const res = await axios.get(
          "http://localhost:3001/api/rooms/saved",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const roomsData = Array.isArray(res.data)
          ? res.data
          : res.data.rooms || res.data.data || [];

        setRooms(roomsData);

      } catch (error) {

        console.error("Error fetching saved rooms:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchSavedRooms();

  }, []);

  return (
    <>
<div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-8">
          ❤️ Saved Rooms
        </h1>

        {loading ? (

          <p>Loading saved rooms...</p>

        ) : rooms.length === 0 ? (

          <p>You haven't saved any rooms yet.</p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}

          </div>

        )}

      </div>
</>
  );
}

export default SavedRooms;