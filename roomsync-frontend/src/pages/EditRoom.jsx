import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";


function EditRoom() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: "",
    rent: "",
    vacancies: "",
    gender_preference: "",
    food_preference: "",
    drinking_allowed: false,
    smoking_allowed: false,
    occupation_preference: "",
    description: ""
  });

  useEffect(() => {

    const fetchRoom = async () => {

      try {

        const res = await axios.get(
          `http://localhost:3001/api/rooms/${id}`
        );

        setForm(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchRoom();

  }, [id]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:3001/api/rooms/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Room updated successfully");

      navigate("/my-rooms");

    } catch (err) {

      toast.error("Update failed");

    }

  };

  return (
    <>
<div className="max-w-4xl mx-auto px-6 py-28">

        <h1 className="text-3xl font-bold mb-10 text-center">
          Edit Room
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-8 space-y-6"
        >

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="rent"
            value={form.rent}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="vacancies"
            value={form.vacancies}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Update Room
          </button>

        </form>

      </div>
</>
  );
}

export default EditRoom;