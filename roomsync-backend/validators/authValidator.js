const { body } = require("express-validator");

// ================= REGISTER VALIDATION =================
exports.validateRegister = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("gender")
    .optional({ checkFalsy: true })
    .isIn(["Male", "Female", "Other", "male", "female", "other"])
    .withMessage("Invalid gender value"),

  body("occupation")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Occupation must be at least 2 characters")

];


// ================= LOGIN VALIDATION =================
exports.validateLogin = [

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")

];