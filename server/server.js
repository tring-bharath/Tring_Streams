const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./Routes/UserRoute");
const videoRoutes = require("./Routes/VideoRoute");

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use("/user", userRoutes);
app.use("/video", videoRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
