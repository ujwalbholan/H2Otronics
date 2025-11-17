import admin from "firebase-admin";
import dotenv from "dotenv";
import express from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
// const serviceAccount = require("/Users/user/coding/h20/backend/h2otronics-firebase-adminsdk-fbsvc-4d58d3a7c4.json");
// const serviceAccount = require("H2Otronics/backend/h2otronics-firebase-adminsdk-fbsvc-4d58d3a7c4.json");

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
