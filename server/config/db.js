const mongoose = require("mongoose");

const connectDB = () => {
  const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/Tring_streams";
  mongoose
    .connect(dbURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("DB Connection Error:", err));
};

module.exports = connectDB;
