const userModal = require("../Schema/UserSchema");
const nodemailer = require("nodemailer");

let send_otp;

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new userModal({ first_name, last_name, email, password });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (user.password === password) {
      res.status(200).send(user);
    } else {
      res.status(200).send("WrongPassword");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  send_otp = Math.floor(Math.random().toFixed(4) * 10000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bharath.a@tringapps.com",
      pass: "rfpt ixnm hymz anuy",
    },
  });

  const mailOptions = {
    from: "bharath.a@tringapps.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${send_otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Failed to send OTP", error: error.message });
    } else {
      return res.status(200).send("OTP sent successfully");
    }
  });
};

const checkOtp = async (req, res) => {
  const { otp } = req.body;
  if (otp == send_otp) {
    return res.status(200).send("OTP verified");
  } else {
    return res.status(400).send("Invalid OTP");
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.password = password;
    await user.save();
    res.status(200).send("Password updated successfully");
  } catch (error) {
    console.log(error);
    
    res.status(500).send({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, sendOtp, checkOtp, resetPassword };
