import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-24 pb-8">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-8 w-full flex-1 flex flex-col">
        
        <div className="mb-8 lg:mb-12 max-w-3xl shrink-0">
          <p className="text-sm text-gray-500 font-bold tracking-widest uppercase mb-4">Overview</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-6 tracking-tight leading-tight">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
            Manage your listings, discover your next workspace, and track team activity with precision and architectural clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          
          {/* Find a Room Card */}
          <div 
            onClick={() => navigate("/find-room")}
            className="bg-white border-2 border-black p-10 lg:p-14 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-full min-h-[400px]"
          >
            {/* Huge Background Icon */}
            <svg 
              className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-80 h-80 text-gray-100 opacity-60 pointer-events-none transform group-hover:scale-110 transition-transform duration-700" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <div>
              <div className="w-14 h-14 bg-[#1A1A1A] text-white flex items-center justify-center mb-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-black tracking-tight">Find a Room</h2>
              <p className="text-base lg:text-lg text-gray-500 max-w-md relative z-10 leading-relaxed">
                Explore our curated collection of architectural workspaces and executive meeting rooms across the globe.
              </p>
            </div>

            <div className="mt-10">
              <button className="bg-[#1A1A1A] text-white text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-black transition-colors inline-flex items-center gap-3">
                Explore Now <span>&rarr;</span>
              </button>
            </div>
          </div>

          {/* Post a Room Card */}
          <div 
            onClick={() => navigate("/post-room")}
            className="bg-[#131313] p-10 lg:p-14 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-full min-h-[400px]"
          >
            {/* Huge Background Icon */}
            <svg 
              className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-80 h-80 text-gray-800 opacity-40 pointer-events-none transform group-hover:scale-110 transition-transform duration-700" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>

            <div>
              <div className="w-14 h-14 bg-white text-black flex items-center justify-center mb-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white tracking-tight">Post a Room</h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-md relative z-10 leading-relaxed">
                List your property within our exclusive ecosystem and connect with high-end design-forward teams.
              </p>
            </div>

            <div className="mt-10">
              <button className="bg-white text-black text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-gray-100 transition-colors inline-flex items-center gap-3">
                Start Listing <span>&rarr;</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
