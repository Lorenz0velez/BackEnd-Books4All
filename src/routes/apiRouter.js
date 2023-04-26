require("dotenv").config();
const express = require('express');
const { Router } = require('express');
const apiRouter = Router();
const Stripe = require('stripe');
const { createBought } = require("../controllers/bought");
const stripe = Stripe(process.env.STRIPE_KEY);
// const stripe = Stripe(process.env.STRIPE_KEY)

apiRouter.post('/create-checkout-session', async (req, res) => {

  let carrito = req.body.cart.map((book) => {
    return {
      bookId: book.bookId,
      quantity: book.quantity,
    }
  })
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(carrito),
    }
  })

  console.log(req.body);

  const line_items = req.body.cart.map(el => {

    if (!el.image) {
      el.image = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
    }
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: el.title,
          images: [el.image],
          metadata: {
            id: el.bookId,
          }
        },
        unit_amount: el.price * 100,
      },
      quantity: el.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: { allowed_countries: ['US', 'CA', 'AR', 'MX', 'CO'] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'usd' },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 1 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    customer: customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}cart`,
  });

  res.send({ url: session.url });
});

//webhooks stripe

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// endpointSecret = "whsec_1c7bb4453a09d28768728ff640253bbaceb2185775eb0d96e41c92bde1c07313";

apiRouter.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let data;
  let eventType;
  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("Webhook verified.");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;

  } else {
    data = request.body.data.object;
    eventType = request.body.type
  }

  // Handle the event
  if (eventType == "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async(customer) => {
        // console.log(customer);
        // console.log("data:", data);
        const booksToBuy = customer.metadata.cart;
        const booksToBuyArray = JSON.parse(booksToBuy);
        const user = customer.metadata.userId
        console.log("mi carrito", booksToBuy);
        // console.log("mi user: ", user);
        await createBought(user, booksToBuyArray)
      })
      .catch((err) => console.log(err.message));
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});

module.exports = apiRouter;