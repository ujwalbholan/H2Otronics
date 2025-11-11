import express from "express";
import {
  registerController,
  loginController,
  forgetPassword,
} from "../controllers/authController.js";

const aurhRoute = express.Router();

aurhRoute.post("/signUp", registerController);
aurhRoute.post("/signIn", loginController);
aurhRoute.post("/forgetPassword", forgetPassword);

export default aurhRoute;
