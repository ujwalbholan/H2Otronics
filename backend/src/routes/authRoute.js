import express from "express";
import {
  registerController,
  loginController,
  forgetPassword,
  logout,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";

const authRoute = express.Router();

authRoute.post("/signUp", registerController);
authRoute.post("/signIn", loginController);
authRoute.post("/forgetPassword", forgetPassword);
authRoute.post("/logout", authenticate, logout);

export default authRoute;
