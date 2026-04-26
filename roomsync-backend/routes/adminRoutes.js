const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const adminController = require("../controllers/adminController");

router.get("/users", verifyToken, adminMiddleware, adminController.getAllUsers);
router.put("/block/:id", verifyToken, adminMiddleware, adminController.blockUser);

module.exports = router;