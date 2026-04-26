import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-24 bg-white">
      {/* Left side (Image) */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden">
        <motion.img 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Architectural space" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-16 pb-24 text-white w-full">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Elevated Living.</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-md">
            Curating premium co-living experiences through architectural precision and shared intent.
          </p>
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-3 tracking-tight text-black">Welcome Back</h2>
          <p className="text-gray-500 mb-12 text-lg">Sign in to your private dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs font-bold tracking-widest text-black uppercase mb-3">Email</label>
              <input 
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border-0 border-b border-gray-300 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-base placeholder-gray-400 bg-transparent outline-none shadow-none"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-bold tracking-widest text-black uppercase">Password</label>
                <a href="#" className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-black transition-colors uppercase">Forgot Password?</a>
              </div>
              <input 
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full border-0 border-b border-gray-300 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-base placeholder-gray-400 tracking-widest bg-transparent outline-none shadow-none"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white font-bold tracking-widest uppercase py-4 hover:bg-gray-900 transition-colors mt-8 text-sm"
            >
              Login
            </button>
          </form>

          <div className="mt-10 mb-8 flex items-center justify-center">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="px-4 text-xs font-bold tracking-widest text-gray-400 uppercase">Or Continue With</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="border border-gray-300 py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-xs font-bold tracking-widest uppercase text-black">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="border border-gray-300 py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors text-xs font-bold tracking-widest uppercase text-black">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.14-.49-3.19 0-1.44.69-2.2.36-3.14-.59-4.04-4.04-4.66-9.98-1.57-12.7 1.34-1.18 2.83-1.28 4.02-.68 1.02.51 1.7.53 2.76 0 1.25-.62 2.65-.54 3.86.37 1.29.97 1.95 2.15 2 3.63-2.66 1.4-2.3 5.32.49 6.55-.37 1.14-1.04 2.19-2.15 3.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.3-1.8 4.22-3.74 4.25z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500">
              New to RoomSync?{' '}
              <button
                type="button"
                className="font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors ml-1"
                onClick={() => navigate("/register")}
              >
                Request Access
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;