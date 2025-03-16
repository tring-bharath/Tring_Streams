const userModal = require("../Schema/UserSchema");
const nodemailer = require("nodemailer");

let send_otp;

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new userModal({ firstName, lastName, email, password });
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
  const existingUser = await userModal.findOne({ email });
    if (!existingUser) {
      console.log("Email doesn't exists");
      return res.status(400).json({ message: "Email doesn't exists" });
    }
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
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 400px; margin: auto;">
        <h2 style="color: #4CAF50;">Your OTP Code</h2>
        <p style="font-size: 16px; color: #333;">Use the following OTP to complete your process:</p>
        <h3 style="font-size: 24px; color: #000;">${send_otp}</h3>
      </div>
    `,
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

const getUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModal.findOne({email},{firstName:1,lastName:1,email:1,_id:0,
        phoneNumber:1,gender:1,ProfilePicture:1,location:1,dataOfBirth:1,bio:1
    });
    res.status(200).send(user);
  }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateUser = async (req, res) => {
  const { email, firstName, lastName, phoneNumber,gender,ProfilePicture,location,dataOfBirth,bio } = req.body;
  try {
    const user = await userModal.findOne({ email });
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.gender=gender;
    user.ProfilePicture=ProfilePicture;
    user.location=location;
    user.dataOfBirth=dataOfBirth;
    user.bio=bio;
    await user.save();
    res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { registerUser,updateUser, loginUser, sendOtp, checkOtp, resetPassword,getUser };
