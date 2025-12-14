import { auth } from "../firebase/firebaseConfig.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

// export async function registerController(req, res) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });

//     const user = await auth.createUser({
//       email,
//       password,
//     });

//     return res.status(201).json({
//       message: "User registered successfully",
//       user: user,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

export async function registerController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Firebase REST API endpoint for sign-up
    const firebaseSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAS3ewaT8u-n-f5pccaxOh847tAngOxFHc`;

    const response = await fetch(firebaseSignupURL, {
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

    return res.status(201).json({
      message: "User registered successfully",
      email: data.email,
      idToken: data.idToken, // Firebase ID token
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      localId: data.localId,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
      idToken: data.idToken,
      refreshToken: data.refreshToken, // Firebase ID token (can be used for auth)
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

export async function logout(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the token to get user UID
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    // Revoke all refresh tokens for this user
    await admin.auth().revokeRefreshTokens(uid);

    return res
      .status(200)
      .json({ message: "Logout successful. Tokens revoked." });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
}

function extractNameFromEmail(email) {
  if (!email) return null;

  const localPart = email.split("@")[0];

  return localPart
    .replace(/[._-]+/g, " ") // replace dots, underscores, hyphens with space
    .replace(/\d+/g, "") // remove numbers
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getMeController(req, res) {
  try {
    const user = req.user;

    const name = user.name || extractNameFromEmail(user.email) || null;

    return res.status(200).json({
      uid: user.uid,

      email: user.email || null,
      emailVerified: user.email_verified || false,
      phoneNumber: user.phone_number || null,

      name,
      picture: user.picture || null,

      signInProvider: user.firebase?.sign_in_provider || null,
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    console.log("email",email);
    console.log("oldPassword",oldPassword);
    console.log("newPassword",newPassword);

    if (!email || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, old password, and new password are required" });
    }

    // 1️⃣ Re-authenticate user with old password
    const firebaseSignInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAS3ewaT8u-n-f5pccaxOh847tAngOxFHc`;
    const signInResponse = await fetch(firebaseSignInURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: oldPassword,
        returnSecureToken: true,
      }),
    });

    const signInData = await signInResponse.json();

    if (!signInResponse.ok) {
      return res
        .status(400)
        .json({ message: signInData.error?.message || "Old password is incorrect" });
    }

    const idToken = signInData.idToken;

    // 2️⃣ Update password using Firebase REST API
    const firebaseUpdateURL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAS3ewaT8u-n-f5pccaxOh847tAngOxFHc`;
    const updateResponse = await fetch(firebaseUpdateURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idToken,
        password: newPassword,
        returnSecureToken: true,
      }),
    });

    const updateData = await updateResponse.json();

    if (!updateResponse.ok) {
      return res
        .status(400)
        .json({ message: updateData.error?.message || "Failed to update password" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
