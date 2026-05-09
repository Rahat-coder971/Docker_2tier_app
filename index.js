const express = require("express");
const mongoose = require("mongoose");

const app = express();

// 🔹 Middleware (to read JSON body)
app.use(express.json());

// 🔹 Mongo connection
const MONGO_URL = "mongodb://mongo:27017/testdb";

// 🔁 Retry connection (important in Docker)
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("❌ Mongo connection failed, retrying...");
    setTimeout(connectDB, 3000);
  }
};

connectDB();

// 🔹 Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// 🔹 Model
const User = mongoose.model("User", userSchema);

// 🔴 POST: Add user (from body)
app.post("/add", async (req, res) => {
  try {
    const { name } = req.body;

    // validation
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = new User({ name });
    await user.save();

    res.status(201).json({
      message: "User saved successfully",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 GET: Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 Root route
app.get("/", (req, res) => {
  res.send("🚀 App is running on port 5000 and connected to MongoDB!!!!!!!!! and is updated");
});

// 🔹 Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on port 5000");
});
