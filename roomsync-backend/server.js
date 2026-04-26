const adminRoutes = require("./routes/adminRoutes");
const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

// Connect DB
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");

// App
const app = express();

// ================= SECURITY MIDDLEWARE =================

// Helmet (adds secure HTTP headers)
app.use(helmet());

// Rate Limiting (10000 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: { message: "Too many requests from this IP, please try again later." },
});

app.use(limiter);

// ================= GLOBAL MIDDLEWARE =================
app.use(cors());
app.use(express.json());


// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("RoomSync API Running...");
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong on the server.",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("==================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log("==================================");
});