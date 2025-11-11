import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("🟢 User found:", user);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match result:", match);

    if (!match)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1d" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const token = Math.random().toString(36).substring(2, 15);
    user.resetToken = token;
    await user.save();

    res.json({
      success: true,
      message: "Password reset token generated",
      resetToken: token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
