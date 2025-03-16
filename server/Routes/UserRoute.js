const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  sendOtp,
  checkOtp,
  resetPassword,
  getUser,
  updateUser
} = require("../Controllers/UserController");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/sendOtp", sendOtp);
router.post("/checkOtp", checkOtp);
router.put("/resetPassword", resetPassword);
router.post("/getUser",getUser)
router.post("/updateUser",updateUser)
module.exports = router;
