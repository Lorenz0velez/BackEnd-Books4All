require("dotenv").config();
const { Router } = require('express');
const apiRouter = Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Mu08BJCQwXBtQNrbOdQorX7ZhZz6SPisSeEQjsAe2RwxFx4mOOKHsuF0wVMByDJkoE4dhkOQzGRIzvzEfBcCL2x00GG1MmXdx');
// const stripe = Stripe(process.env.STRIPE_KEY)

apiRouter.post('/create-checkout-session', async (req, res) => {
    const customer = await stripe.customers.create({
      metadata: {
        // user_id: req.body.data.user.user_id,
        // cart: JSON.stringify(req.body.data.items),
        // total: req.body.data.total,
      }
    })
 
    const line_items = req.body.cart.map(el=>{

      if(!el.image) {
        el.image = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
        return{
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
    shipping_address_collection: {allowed_countries: ['US', 'CA', 'AR', 'MX', 'CO']},
    shipping_options: [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {amount: 0, currency: 'usd'},
        display_name: 'Free shipping',
        delivery_estimate: {
          minimum: {unit: 'business_day', value: 5},
          maximum: {unit: 'business_day', value: 7},
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {amount: 500, currency: 'usd'},
        display_name: 'Next day air',
        delivery_estimate: {
          minimum: {unit: 'business_day', value: 1},
          maximum: {unit: 'business_day', value: 1},
        },
      },
    },
  ],
    phone_number_collection:{
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}cart`, 
  });

  res.send({url: session.url});
});

module.exports = apiRouter;