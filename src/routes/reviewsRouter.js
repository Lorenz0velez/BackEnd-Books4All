const { Router } = require('express');
const { getAllReviews, getReviewDetail, createReview } = require('../controllers/reviewsControllers');
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

reviewsRouter.post('/', checkAuth, authorizationMiddleware, async (req, res) => {
    const { body, rating, book_id, user_name } = req.body;
    try {
        let response = await createReview(body, rating, book_id, user_name)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send(error.message)
    }
})
 

module.exports = reviewsRouter;