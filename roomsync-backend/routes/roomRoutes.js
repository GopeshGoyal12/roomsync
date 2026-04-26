const express = require("express");
const router = express.Router();

const {
  createRoom,
  getAllRooms,
  getMyRooms,
  updateRoom,
  deleteRoom,
  saveRoom,
  getSavedRooms,
  unsaveRoom,
  getRoomById,
  searchByAI
} = require("../controllers/roomController");

const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


// CREATE ROOM
router.post("/", verifyToken, upload.single("image"), createRoom);

// AI SEARCH
router.post("/ai-search", searchByAI);

// GET ALL ROOMS
router.get("/", getAllRooms);

// GET MY ROOMS
router.get("/my", verifyToken, getMyRooms);


// ================= SAVED ROOMS =================

// SAVE ROOM
router.post("/save/:id", verifyToken, saveRoom);

// GET SAVED ROOMS
router.get("/saved", verifyToken, getSavedRooms);

// UNSAVE ROOM
router.delete("/unsave/:id", verifyToken, unsaveRoom);


// UPDATE ROOM
router.put("/:id", verifyToken, upload.single("image"), updateRoom);

// DELETE ROOM
router.delete("/:id", verifyToken, deleteRoom);

// GET ROOM BY ID  ⭐ (keep this LAST)
router.get("/:id", getRoomById);


module.exports = router;