const {Router} = require('express');
const { updateUserState } = require('../controllers/userControllers'); 
const { updateBookState } = require('../controllers/putBookController')
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

module.exports = adminRouter;