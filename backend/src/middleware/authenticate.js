import { auth } from "../firebase/firebaseConfig.js";

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    console.log(token);
    const decoded = await auth.verifyIdToken(token);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
}
