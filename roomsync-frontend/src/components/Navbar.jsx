import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "FIND ROOMS", path: "/find-room" },
    { name: "SAVED ROOMS", path: "/saved-rooms" },
    { name: "POST ROOM", path: "/post-room" },
    { name: "MY ROOMS", path: "/my-rooms" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-5xl font-extrabold tracking-tight text-black uppercase">
          RoomSync
        </Link>

        {isAuthPage ? (
          <Link to="#" className="text-sm font-bold tracking-widest text-gray-400 hover:text-black transition-colors uppercase">
            Help
          </Link>
        ) : (
          <>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-base font-bold tracking-widest text-gray-500">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative hover:text-black transition-colors ${active ? "text-black" : ""}`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute left-0 -bottom-2 h-[1px] w-full bg-black"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-6">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="text-base font-bold tracking-widest text-black hover:text-gray-600 transition-colors uppercase"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-3 text-base font-bold uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-6 text-base font-bold tracking-widest uppercase">
                  <span className="text-black">
                    {user?.name || "USER"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;