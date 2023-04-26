const {Router} = require('express');
const booksRouter = require ('./booksRouter')
const reviewsRouter = require('./reviewsRouter');
const usersRouter = require ('./usersRouter');
const apiRouter = require('./apiRouter');
const putRouter = require('./putRouter');
const adminRouter = require('./adminRouter');
const mainRouter = Router();

mainRouter.use('/books', booksRouter)
mainRouter.use('/reviews', reviewsRouter)
mainRouter.use('/users', usersRouter)
mainRouter.use('/api/stripe', apiRouter)
mainRouter.use('/deleted', putRouter)
mainRouter.use('/admin', adminRouter)
module.exports = mainRouter;
