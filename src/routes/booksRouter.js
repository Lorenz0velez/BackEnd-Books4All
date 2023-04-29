const { Router } = require('express');
const getAllBooks = require('../controllers/getAllBooks');
const getOneBook = require('../controllers/getOneBook');
const getBooksByQuery = require('../controllers/getBooksByQuery');
const {getDeletedBooks} = require('../controllers/putBookController');
const { adminCreateBook } = require('../controllers/adminCreateBook');
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

booksRouter.get('/blocked', async (req, res) => {
    try {
        const banBooks = await getDeletedBooks()
        return res.status(200).send(banBooks)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
})

booksRouter.get('/:bookId', async (req, res) => {

    const { bookId } = req.params;
    
    try {
        const book = await getOneBook(bookId)
        res.status(200).json(book);
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
})

booksRouter.post('/createBook', async (req, res)=>{
    const {id, title, authors, categories, price, description, image} = req.body;

    if ( !id || !title || !authors || !categories || !price || !description || !image){ 
    return res.status(404).send({msg: 'Required data is missing'})
    }

    try {
        const newBook = await adminCreateBook(id, title, authors, categories, price, description, image)
       console.log(newBook);
        res.status(200).json(newBook)
    } catch (error) {
        console.log(error)
        console.log("no se creo correctamente el libro");
        res.status(400).send(error.message)
    }
})



module.exports = booksRouter;