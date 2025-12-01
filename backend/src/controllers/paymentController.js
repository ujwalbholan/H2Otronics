import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function makePayment(req, res) {
  try {
    const { planName, price } = req.body;

    const numericPrice = parseInt(price.replace(/\D/g, ""), 10);

    if (isNaN(numericPrice)) {
      throw new Error("Invalid price value received");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "npr",
            product_data: {
              name: planName,
            },
            recurring: { interval: "month" },
            unit_amount: numericPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:5173/dashboard/subscription",
      cancel_url: "http://localhost:5173/dashboard/subscription",
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
