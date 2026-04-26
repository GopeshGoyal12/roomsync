import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostRoom from "./pages/PostRoom";
import MyRooms from "./pages/MyRooms";
import SavedRooms from "./pages/SavedRooms";
import EditRoom from "./pages/EditRoom";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import RoomFinder from "./pages/RoomFinder";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/rooms/:id" element={<PageTransition><RoomDetails /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/find-room" element={<PageTransition><RoomFinder /></PageTransition>} />
            <Route path="/post-room" element={<PageTransition><PostRoom /></PageTransition>} />
            <Route path="/my-rooms" element={<PageTransition><MyRooms /></PageTransition>} />
            <Route path="/saved-rooms" element={<PageTransition><SavedRooms /></PageTransition>} />
            <Route path="/edit-room/:id" element={<PageTransition><EditRoom /></PageTransition>} />
            <Route path="/admin-dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff"
          }
        }}
      />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;