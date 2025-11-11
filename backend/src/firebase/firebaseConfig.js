import admin from "firebase-admin";
import dotenv from "dotenv";
import express from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require(process.env.serviceAccountUrl);

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export default admin;
