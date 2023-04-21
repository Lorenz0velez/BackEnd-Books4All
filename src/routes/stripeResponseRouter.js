const express = require('express');
const {Router} = require('express');
const stripeResponseRouter = Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Mu08BJCQwXBtQNrbOdQorX7ZhZz6SPisSeEQjsAe2RwxFx4mOOKHsuF0wVMByDJkoE4dhkOQzGRIzvzEfBcCL2x00GG1MmXdx');

const endpointSecret = "whsec_1c7bb4453a09d28768728ff640253bbaceb2185775eb0d96e41c92bde1c07313";

stripeResponseRouter.post('/', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

module.exports = stripeResponseRouter;