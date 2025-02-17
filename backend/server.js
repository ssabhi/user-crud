// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User");
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// API Endpoints
app.get("/user", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.post("/user", async (req, res) => {
  const { user, interest, age, mobile, email } = req.body;
  const newUser = new User({ user, interest, age, mobile, email });
  await newUser.save();
  res.json(newUser);
});

app.put("/user/:id", async (req, res) => {
  const { user, interest, age, mobile, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { user, interest, age, mobile, email }, { new: true });
  res.json(updatedUser);
});

app.delete('/user/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
