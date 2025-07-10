const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Supplier = require("../models/Supplier");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log('Received signup request:', req.body); // Debug log

    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      role
    });

    // Save user to database
    await user.save();
    console.log('User saved successfully:', user); // Debug log

    // If the user is a supplier, create a supplier record
    if (role === 'supplier') {
      const supplier = new Supplier({
        supplierName: username,
        vehicleType: 'Not specified', // Default value
        supplierQuantity: 0, // Default value
        email: email
      });

      await supplier.save();
      console.log('Supplier record created:', supplier); // Debug log
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Signup error:', error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT Token with role
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role 
      }, 
      'your_secret_key', 
      { expiresIn: "1h" }
    );

    // Send response with token and user info
    res.json({ 
      message: "Login Successful", 
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server Error" });
  }
});

const tokenBlacklist = new Set();
// Logout Route
router.post("/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  tokenBlacklist.add(token);
  res.json({ message: "Logout successful" });
});

// Middleware to check for blacklisted tokens
function checkBlacklistedToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ message: "Token has been revoked" });
    }
  }
  next();
}

// Apply the middleware to protected routes as needed

module.exports = router;