const mongoose = require("mongoose");

const connectDB = () => {
  const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/Tring_streams";
  mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("DB Connection Error:", err));
};

module.exports = connectDB;
