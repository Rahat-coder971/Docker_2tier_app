const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔹 Mongo connection
const MONGO_URL = "mongodb://localhost:27017/testdb";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Mongo Error:", err));

// 🔹 Schema
const userSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("User", userSchema);

// 🔴 Route 1: Add data
app.get("/add", async (req, res) => {
  const user = new User({ name: "Rahat" });
  await user.save();
  res.send("User added to DB");
});

// 🔴 Route 2: Get data
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 🔴 Root route
app.get("/", (req, res) => {
  res.send("🚀 App is running!");
});

// 🔹 Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});