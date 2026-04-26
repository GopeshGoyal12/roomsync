import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function RoomDetails() {

  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {

    axios
      .get(`http://localhost:3001/api/rooms/${id}`)
      .then((res) => {

        const roomData = res.data.room || res.data;

        setRoom(roomData);

      })
      .catch((err) => {
        console.error(err);
      });

  }, [id]);

  const handleContact = () => {
    setShowContact(true);
  };

  if (!room) {
    return (
      <>
<div className="p-20 text-center">Loading...</div>
</>
    );
  }

  return (
    <>
<div className="max-w-6xl mx-auto px-6 py-10">

        {/* Room Image */}
        <img
          src={
            room.image
              ? `http://localhost:3001/uploads/${room.image}`
              : "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          }
          alt="room"
          className="w-full h-[420px] object-cover rounded-xl"
        />

        <div className="grid md:grid-cols-3 gap-10 mt-10">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-6">

            {room.is_suspicious === 1 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800 font-bold uppercase tracking-wider">
                      Suspicious Listing Warning (AI Detected)
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      {room.suspicious_reason || "This listing has been flagged by our AI as potentially suspicious or fake. Please verify before transferring any money."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <h1 className="text-3xl font-bold">
              Room in {room.location}
            </h1>

            <p className="text-gray-600">
              {room.description}
            </p>

            <div className="flex gap-4 flex-wrap">

              <span className="bg-gray-100 px-4 py-2 rounded">
                👤 {room.gender_preference}
              </span>

              <span className="bg-gray-100 px-4 py-2 rounded">
                🍽 {room.food_preference}
              </span>

              <span className="bg-gray-100 px-4 py-2 rounded">
                🛏 {room.vacancies} vacancies
              </span>

            </div>

          </div>

          {/* RIGHT SIDE CARD */}
          <div className="border rounded-xl p-6 shadow-md h-fit">

            <h2 className="text-2xl font-bold mb-4">
              ₹{room.rent} / month
            </h2>

            {/* SAVE ROOM */}
            <button
              className="w-full bg-red-500 text-white py-3 rounded mb-3"
            >
              ❤️ Save Room
            </button>

            {/* CONTACT OWNER */}
            <button
              onClick={handleContact}
              className="w-full border border-black py-3 rounded"
            >
              📞 Contact Owner
            </button>

            {/* PHONE NUMBER */}
            {showContact && (

              <div className="mt-4 p-3 bg-gray-100 rounded">

                <p className="font-semibold">
                  Owner Phone:
                </p>

                <p className="text-lg">
                  {room.phone || "Not Available"}
                </p>

              </div>

            )}

          </div>

        </div>

      </div>
</>
  );
}

export default RoomDetails;