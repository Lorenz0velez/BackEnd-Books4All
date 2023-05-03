const { Router } = require('express');
const { getAllReviews, getReviewDetail, createReview, userReview, updateReview } = require('../controllers/reviewsControllers');
const authorizationMiddleware = require ('../Middlewares/Middlewares');
const { checkAuth } = require('../Middlewares/auth');


const reviewsRouter = Router();

reviewsRouter.get('/', async (req, res) => {
    try {
         let response = await getAllReviews()
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})
reviewsRouter.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let response = await getReviewDetail(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

reviewsRouter.get('/user/:user', async (req, res) => {
    let { user } = req.params;
    try {
        let response = await userReview(user)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

reviewsRouter.post('/', authorizationMiddleware, async (req, res) => {
    const { body, rating, book_id, user_name, user_avatar} = req.body;
    try {
        let response = await createReview(body, rating, book_id, user_name, user_avatar)
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        console.log("no esta ingresado el usuario");
        res.status(400).send(error.message)
    }
})
reviewsRouter.put('/', async (req, res) => {
    const {id, body, rating} = req.body;
    console.log(id)
    try {
        let response = await updateReview(id, body, rating)
        res.status(200).send(response);
        
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
})
 

module.exports = reviewsRouter;