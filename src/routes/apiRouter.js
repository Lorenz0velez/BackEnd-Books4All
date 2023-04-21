require("dotenv").config();
const { Router } = require('express');
const apiRouter = Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Mu08BJCQwXBtQNrbOdQorX7ZhZz6SPisSeEQjsAe2RwxFx4mOOKHsuF0wVMByDJkoE4dhkOQzGRIzvzEfBcCL2x00GG1MmXdx');
// const stripe = Stripe(process.env.STRIPE_KEY)

apiRouter.post('/create-checkout-session', async (req, res) => {
 
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

    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}cart`, 
  });

  res.send({url: session.url});
});

module.exports = apiRouter;