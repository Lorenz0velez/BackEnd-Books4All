const { Router } = require('express');
const getAllBooks = require('../controllers/getAllBooks');
const getOneBook = require('../controllers/getOneBook');
const getBooksByQuery = require('../controllers/getBooksByQuery');
const {putBook, getDeletedBooks} = require('../controllers/putBookController');
const booksRouter = Router();


//Obtener todos los libros 

booksRouter.get('/', async (req, res) => {
    const { queryBook } = req.query;
    if (queryBook) {
        try {
            const books = await getBooksByQuery(queryBook)
            return res.status(200).json(books) 
        } catch (error) {
            return res.status(400).json({error:error.message}) 
        }
    }
    try {
        const allBooks = await getAllBooks();
        return res.status(200).json(allBooks);
    } catch (error) {
        return res.status(400).json({error:error.message})
    } 
});

booksRouter.get('/:bookId', async (req, res) => {

    const { bookId } = req.params;
    
    try {
        const book = await getOneBook(bookId)
        res.status(200).json(book);
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
})



module.exports = booksRouter;