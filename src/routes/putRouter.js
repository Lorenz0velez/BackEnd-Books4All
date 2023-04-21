const { Router } = require('express');
const {putBook, getDeletedBooks} = require('../controllers/putBookController');
const putRouter = Router();

putRouter.put('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const {active} = req.body;
    try {
        let response = await putBook(bookId, active)
        res.status(200).send(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
})
putRouter.get('/', async (req, res) => {
    
    try {
        const books = await getDeletedBooks()
            return res.status(200).json(books) 
    } catch (error) {
        res.status(200).send(error.message)
    }
})

module.exports = putRouter;
