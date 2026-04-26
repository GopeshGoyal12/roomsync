const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

const {
  validateRegister,
  validateLogin
} = require("../validators/authValidator");


// REGISTER
router.post("/register", validateRegister, registerUser);


// LOGIN
router.post("/login", validateLogin, loginUser);


module.exports = router;