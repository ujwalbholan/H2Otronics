import { auth } from "../firebase/firebaseConfig.js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export async function registerController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await auth.createUser({
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    // Firebase REST API endpoint for sign-in
    const firebaseLoginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAS3ewaT8u-n-f5pccaxOh847tAngOxFHc`;

    const response = await fetch(firebaseLoginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ message: data.error.message });
    }

    return res.status(200).json({
      message: "Login successful",
      email: data.email,
      idToken: data.idToken, // Firebase ID token (can be used for auth)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function forgetPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const resetLink = await auth.generatePasswordResetLink(email);

    return res.status(200).json({
      message: "Password reset link sent to email",
      resetLink,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
