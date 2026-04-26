import axios from "axios";

const API = "http://localhost:3001/api";

export const getRooms = async () => {
  const res = await axios.get(`${API}/rooms`);
  return res.data.rooms;
};