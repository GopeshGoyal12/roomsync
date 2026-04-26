import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    occupation: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.gender || !form.occupation) {
      toast.error("Please select your gender and occupation.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/auth/register", form);

      toast.success("Registration successful");

      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Registration failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-black relative overflow-hidden">
      {/* Moving Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Modern Interior" 
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Form Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-12 px-6">
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md p-10 md:p-16 border border-gray-200 shadow-2xl">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-3">Join the community.</h1>
            <p className="text-lg text-gray-500">Enter your details to find your perfect room match.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-black py-4 px-4 focus:outline-none focus:ring-1 focus:ring-black transition-colors text-black placeholder-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-black py-4 px-4 focus:outline-none focus:ring-1 focus:ring-black transition-colors text-black placeholder-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  className="w-full border border-black py-4 px-4 focus:outline-none focus:ring-1 focus:ring-black transition-colors text-black placeholder-gray-300 tracking-widest"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">Gender Selection</label>
              <div className="flex border-y border-l border-black">
                {['Male', 'Female', 'Other'].map(option => (
                  <button 
                    key={option} 
                    type="button"
                    onClick={() => setForm({...form, gender: option})}
                    className={`flex-1 py-4 text-sm font-bold tracking-widest border-r border-black transition-colors ${form.gender === option ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">Occupation Selection</label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {['Student', 'Engineer', 'Doctor'].map(option => (
                  <button 
                    key={option} 
                    type="button"
                    onClick={() => setForm({...form, occupation: option})}
                    className={`py-4 text-sm font-bold tracking-widest border border-black transition-colors ${form.occupation === option ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Corporate', 'Other'].map(option => (
                  <button 
                    key={option} 
                    type="button"
                    onClick={() => setForm({...form, occupation: option})}
                    className={`py-4 text-sm font-bold tracking-widest border border-black transition-colors ${form.occupation === option ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full bg-black text-white font-bold tracking-widest py-5 hover:bg-gray-900 transition-colors text-sm"
              >
                Create Account
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                className="font-bold text-black border-b-2 border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors text-sm"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>

            <div className="text-center pt-8">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                BY CREATING AN ACCOUNT, YOU AGREE TO OUR TERMS & CONDITIONS.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;