import { motion } from "framer-motion";
import RoomCard from "./RoomCard";

function FeaturedRooms({ rooms }) {

  const featured = rooms.slice(0, 3);

  return (

    <div className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold text-center mb-12">
        Featured Rooms
      </h2>

      <div className="grid md:grid-cols-3 gap-8 justify-items-center">

        {featured.map((room) => (

          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            <RoomCard room={room} />

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default FeaturedRooms;