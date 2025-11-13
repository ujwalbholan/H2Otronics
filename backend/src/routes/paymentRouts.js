import express from 'express';
import { makePayment } from '../controllers/paymentController.js';


const paymentRoute = express.Router();

paymentRoute.post("/", makePayment);


export default paymentRoute;