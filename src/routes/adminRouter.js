const {Router} = require('express');
const { updateUserState } = require('../controllers/userControllers'); 
const { updateBookState, updateBookInfo, updateBookPic } = require('../controllers/putBookController')
const { deleteReview } = require('../controllers/reviewsControllers')
const {Book} = require('../DB_connection');

const adminRouter = Router();

adminRouter.put('/state/:name', async (req, res) => {
    const {name} = req.params;
    try {
        const updateNewUserState = await updateUserState(name);
        return res.status(200).send(updateNewUserState.message)
    } catch (error) {
        return res.status(400).send(error);  
    }
})


adminRouter.put('/booksState/:title', async (req, res) => {
    const {title} = req.params;
    try {
        const response = await updateBookState(title);
        return res.status(200).send(response.message)
    } catch (error) {
        return res.status(400).send(error.message); 
    }
})

adminRouter.delete('/review/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteReview(id)
        return res.status(200).send(response.message)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

adminRouter.put('/modify/:bookId', async (req, res) => {
    const {bookId} = req.params;
    const { title, authors, categories, price, stock, description } = req.body
    try {
        const response = await updateBookInfo(bookId, title, authors, categories, price, stock, description)
        return res.status(200).send(response.message)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

adminRouter.put('/updateBookPic/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const { picture } = req.body;

    try {
        const response = await updateBookPic(bookId, picture) 
        return res.status(200).send(response.message)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// adminRouter.put('/bookDetail/:bookId', async (req, res) => {
//     const {bookId} = req.params
//     const {title} = req.body
//     try {
//         const response = await updateBookInfo(title)
//     } catch (error) {
        
//     }
// })

module.exports = adminRouter;