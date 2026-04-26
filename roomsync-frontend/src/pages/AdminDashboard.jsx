import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/post-room")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h2 className="text-xl font-semibold">Post Room</h2>
        </div>

        <div
          onClick={() => navigate("/manage-rooms")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h2 className="text-xl font-semibold">Manage Rooms</h2>
        </div>

        <div
          onClick={() => navigate("/users")}
          className="bg-white p-6 shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h2 className="text-xl font-semibold">Users</h2>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;