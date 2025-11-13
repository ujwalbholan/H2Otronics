import {loadStripe} from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY);


export async function makePayment(req, res) {
  const data = req.body;
}
