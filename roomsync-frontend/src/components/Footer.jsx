import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="text-base font-extrabold tracking-tight text-black uppercase">
          RoomSync
        </Link>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold tracking-widest uppercase text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Terms of Service</Link>
          <Link to="/" className="hover:text-black transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-black transition-colors">Contact Support</Link>
          <Link to="/" className="hover:text-black transition-colors">Press Kit</Link>
          <Link to="/" className="hover:text-black transition-colors">Careers</Link>
        </div>

        <div className="text-sm font-bold tracking-widest uppercase text-gray-400">
          © 2026 RoomSync. Architectural Integrity in Living.
        </div>
      </div>
    </footer>
  );
}

export default Footer;