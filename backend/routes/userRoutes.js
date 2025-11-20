import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticateToken from '../auth/userAuth.js';

const userRouter = express.Router();

// Sign-Up
userRouter.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username.length < 4) {
      return res.status(400).json({ message:"Username length should be greater than 3 charecters" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message:"Username already exists." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message:"Email already exists." });
    }

    if (password.length <= 5) {
      return res.status(400).json({ message:"Password length should be greater than 5" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPass, address });
    await newUser.save();

    return res.status(200).json({ message:"Sign-Up successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Sign-in
userRouter.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, existingUser.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      {
        id: existingUser._id.toString(),
        role: existingUser.role,
        name: existingUser.username,
      },
      "bookStore123",
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      id: existingUser._id,
      role: existingUser.role,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get user-information
userRouter.get("/get-user-info", authenticateToken, async (req, res) => {
  try {
  
    const data = await User.findById(req.user.id).select("-password");
    if (!data) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update address
userRouter.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { address } = req.body;
    await User.findByIdAndUpdate(req.user.id, { address });
    return res.status(200).json({ message:"Address updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
