const express = require("express")
const router  = express.Router();
const registerValidation = require("../middlewares/authValidation")
const {register,login} = require("../controllers/authController")

router.post("/register",registerValidation,register)//go to controller now
router.post("/login",login)

module.exports = router;