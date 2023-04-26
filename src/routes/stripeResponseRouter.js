const express = require('express');
const {Router} = require('express');
const stripeResponseRouter = Router();
const Stripe = require('stripe');
const { getEventType } = require('../controllers/stripeEvent');
const stripe = Stripe('sk_test_51Mu08BJCQwXBtQNrbOdQorX7ZhZz6SPisSeEQjsAe2RwxFx4mOOKHsuF0wVMByDJkoE4dhkOQzGRIzvzEfBcCL2x00GG1MmXdx');
const endpointSecret = "whsec_1c7bb4453a09d28768728ff640253bbaceb2185775eb0d96e41c92bde1c07313";

stripeResponseRouter.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const event = request.body;
  console.log(event)

  // Handle the event
  switch (event.type) {
    case 'charge.succeeded':
      const chargeSucceeded = event.data.object;
      // Then define and call a method to handle the succeeded charge.
      // handlechargeSucceeded(chargeSucceeded);
    case 'payment_intent.created':
      const paymentCreated = event.data.object;
      // Then define and call a method to handle the created payment.
      // handlepaymentCreated(paymentCreated);
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded.amount_details)
      // Then define and call a method to handle the succeeded payment.
      // handlepaymentIntentSucceeded(paymentIntentSucceeded);
    case 'checkout.session.async_payment_failed':
      const paymentFailed = event.data.object;
      // Then define and call a method to handle the failed payment intent.
      // handlePaymentIntentFailed(paymentFailed);
      break;
    case 'checkout.session.async_payment_succeeded':
      const paymentSucceeded = event.data.object;
      // Then define and call a method to handle the successful payment.
      // handlePaymentSucceeded(paymentSucceeded);
    case 'checkout.session.completed':
      const checkoutCompleted = event.data.object;
      // stripe.customers.retrieve(data.customer).then(customer =>{
      //   console.log('Customer details', customer),
      //   console.log('Data', data)
      // });
      // Then define and call a method to handle the completed Checkout.
      // handleCheckoutSucceeded(checkoutCompleted);
      break;
    // ... handle other event types
    default:
      console.log(`Event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});


module.exports = stripeResponseRouter;