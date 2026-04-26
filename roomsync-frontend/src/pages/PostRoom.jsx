import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function PostRoom() {
  const [form, setForm] = useState({
    title: "",
    property_type: "Apartment",
    description: "",
    rent: "",
    security_deposit: "",
    available_from: "",
    utilities_included: false,
    furnished: false,
    pet_friendly: false,
    address: "",
    contact_email: "",
    phone_number: "",
    cleanliness: 50,
    social_vibe: "Quiet Sanctuary"
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });
      if (image) {
        data.append("image", image);
      }
      await axios.post(
        "http://localhost:3001/api/rooms",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      toast.success("Room posted successfully");
      setForm({
        title: "",
        property_type: "Apartment",
        description: "",
        rent: "",
        security_deposit: "",
        available_from: "",
        utilities_included: false,
        furnished: false,
        pet_friendly: false,
        address: "",
        contact_email: "",
        phone_number: "",
        cleanliness: 50,
        social_vibe: "Quiet Sanctuary"
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to post room");
    }
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-7xl md:text-[5rem] font-extrabold text-black mb-4 tracking-tighter uppercase leading-none">
            Post A Room
          </h1>
          <p className="text-gray-500 text-xl max-w-xl">
            Architectural integrity in shared living. Complete the details below to list your space on the ROOMSYNC ecosystem.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Sidebar Navigation */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-32 border-l-2 border-gray-100">
              <nav className="flex flex-col">
                <a href="#basics" className="py-3 pl-4 border-l-2 border-black -ml-[2px] text-sm font-bold tracking-widest text-black uppercase transition-colors">01 The Basics</a>
                <a href="#cost" className="py-3 pl-4 border-l-2 border-transparent -ml-[2px] text-sm font-bold tracking-widest text-gray-400 hover:text-black uppercase transition-colors">02 Cost & Capacity</a>
                <a href="#location" className="py-3 pl-4 border-l-2 border-transparent -ml-[2px] text-sm font-bold tracking-widest text-gray-400 hover:text-black uppercase transition-colors">03 Location & Contact</a>
                <a href="#roommate" className="py-3 pl-4 border-l-2 border-transparent -ml-[2px] text-sm font-bold tracking-widest text-gray-400 hover:text-black uppercase transition-colors">04 Ideal Roommate</a>
                <a href="#photos" className="py-3 pl-4 border-l-2 border-transparent -ml-[2px] text-sm font-bold tracking-widest text-gray-400 hover:text-black uppercase transition-colors">05 Photos</a>
              </nav>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-20">
              
              {/* 01 THE BASICS */}
              <div id="basics" className="scroll-mt-32">
                <div className="border-b border-black pb-4 mb-8 flex justify-between items-end">
                  <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">01 The Basics</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Listing Title</label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Minimalist Loft in SoHo"
                        className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Property Type</label>
                      <select
                        name="property_type"
                        value={form.property_type}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 text-black p-4 rounded-none focus:outline-none focus:border-black transition-colors appearance-none"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Studio">Studio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the architectural highlights, natural light, and vibe..."
                      rows="5"
                      className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 02 COST & CAPACITY */}
              <div id="cost" className="scroll-mt-32">
                <div className="border-b border-black pb-4 mb-8 flex justify-between items-end">
                  <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">02 Cost & Capacity</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Monthly Rent ($)</label>
                      <input
                        type="number"
                        name="rent"
                        value={form.rent}
                        onChange={handleChange}
                        placeholder="2400"
                        className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Security Deposit ($)</label>
                      <input
                        type="number"
                        name="security_deposit"
                        value={form.security_deposit}
                        onChange={handleChange}
                        placeholder="1200"
                        className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Available From</label>
                      <input
                        type="date"
                        name="available_from"
                        value={form.available_from}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group bg-gray-100 px-4 py-3 border border-transparent hover:border-gray-300 transition-colors">
                      <input
                        type="checkbox"
                        name="utilities_included"
                        checked={form.utilities_included}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 border border-gray-400 rounded-none checked:bg-black checked:border-black transition-all cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-[2px] checked:after:-top-[1px]"
                      />
                      <span className="text-sm font-bold text-gray-600 tracking-wide">Utilities Included</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group bg-gray-100 px-4 py-3 border border-transparent hover:border-gray-300 transition-colors">
                      <input
                        type="checkbox"
                        name="furnished"
                        checked={form.furnished}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 border border-gray-400 rounded-none checked:bg-black checked:border-black transition-all cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-[2px] checked:after:-top-[1px]"
                      />
                      <span className="text-sm font-bold text-gray-600 tracking-wide">Furnished</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group bg-gray-100 px-4 py-3 border border-transparent hover:border-gray-300 transition-colors">
                      <input
                        type="checkbox"
                        name="pet_friendly"
                        checked={form.pet_friendly}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 border border-gray-400 rounded-none checked:bg-black checked:border-black transition-all cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-[2px] checked:after:-top-[1px]"
                      />
                      <span className="text-sm font-bold text-gray-600 tracking-wide">Pet Friendly</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 03 LOCATION & CONTACT */}
              <div id="location" className="scroll-mt-32">
                <div className="border-b border-black pb-4 mb-8 flex justify-between items-end">
                  <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">03 Location & Contact</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Full Address</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Bauhaus Avenue, Design District, NY"
                      className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Contact Email</label>
                      <input
                        type="email"
                        name="contact_email"
                        value={form.contact_email}
                        onChange={handleChange}
                        placeholder="alex@roomsync.com"
                        className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Phone Number</label>
                      <input
                        type="text"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 p-4 rounded-none focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>


                </div>
              </div>

              {/* 04 IDEAL ROOMMATE */}
              <div id="roommate" className="scroll-mt-32">
                <div className="border-b border-black pb-4 mb-8 flex justify-between items-end">
                  <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">04 Ideal Roommate</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                <p className="text-gray-400 text-base mb-8">Describe the lifestyle of the person you're looking for.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-sm font-bold text-gray-400 tracking-widest uppercase">Cleanliness Level</label>
                    </div>
                    <div className="relative pt-1">
                      <input
                        type="range"
                        name="cleanliness"
                        min="0"
                        max="100"
                        value={form.cleanliness}
                        onChange={handleChange}
                        className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-black"
                      />
                      <div className="flex justify-between text-[0.6rem] font-bold text-gray-400 tracking-widest uppercase mt-2">
                        <span>Relaxed</span>
                        <span>Pristine</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">Social Vibe</label>
                    <select
                      name="social_vibe"
                      value={form.social_vibe}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 text-black p-4 rounded-none focus:outline-none focus:border-black transition-colors appearance-none"
                    >
                      <option value="Quiet Sanctuary">Quiet Sanctuary</option>
                      <option value="Social & Outgoing">Social & Outgoing</option>
                      <option value="Balanced">Balanced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 05 PHOTOS */}
              <div id="photos" className="scroll-mt-32">
                <div className="border-b border-black pb-4 mb-8 flex justify-between items-end">
                  <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">05 Photos</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full h-80 border-2 border-dashed border-gray-200 bg-white hover:bg-gray-50 transition-colors relative flex items-center justify-center">
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                      <svg className="w-8 h-8 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest">Main Cover Image</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
                    </label>

                    {preview && (
                      <div className="absolute inset-0 bg-white z-10">
                        <img
                          src={preview}
                          alt="preview"
                          className="w-full h-full object-cover grayscale opacity-90"
                        />
                        <button 
                          type="button"
                          onClick={(e) => { e.preventDefault(); setImage(null); setPreview(null); }}
                          className="absolute top-4 right-4 bg-white text-black p-2 hover:bg-gray-100 shadow-sm transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 h-80">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4"></path></svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-16 pb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-100 mt-16">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border border-gray-400 rounded-none checked:bg-black checked:border-black transition-all cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-[2px] checked:after:-top-[1px]"
                    required
                  />
                  <span className="text-[0.6rem] font-bold text-gray-400 tracking-widest uppercase">I agree to the RoomSync Terms and Privacy Policy</span>
                </label>
                
                <button
                  type="submit"
                  className="bg-black text-white text-sm font-bold uppercase tracking-widest px-10 py-5 hover:bg-gray-900 transition-colors w-full md:w-auto"
                >
                  Post Room Listing
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRoom;