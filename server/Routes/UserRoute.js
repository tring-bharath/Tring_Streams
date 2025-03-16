const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  sendOtp,
  checkOtp,
  resetPassword,
} = require("../Controllers/UserController");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/sendOtp", sendOtp);
router.post("/checkOtp", checkOtp);
router.put("/resetPassword", resetPassword);

module.exports = router;
