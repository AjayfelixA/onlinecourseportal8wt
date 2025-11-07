const express = require("express");
const router = express.Router();
const User = require("../models/user");   // ✅ FIX — use capital U

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) return res.json({ success: false, message: "User exists" });

    const newUser = await User.create({ name, email, username, password });

    res.json({ success: true, user: newUser });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user) return res.json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, user });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
