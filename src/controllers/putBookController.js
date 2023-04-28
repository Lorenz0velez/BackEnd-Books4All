const {Book} = require("../DB_connection");

const putBook = (id, active) => {
    let updateBook = Book.update({active},
        {
            where: {
                id
            }
        }
        )
    return updateBook
    }

const getDeletedBooks = async () => {

  return await Book.findAll({
    where: {
      active: false
    }
  });
};

const updateBookState = async (title) => {
  const book = await Book.findOne({
    where: { title: title }
  })

  book.active = !book.active;
  await book.save({ fields: ['active']})
  return {message: `${book.title}' state has been changed to ${book.active === true ? 'active' : 'disabled'}`}
  
}

const updateBookInfo = async (bookId, title, authors, categories, price, stock, description) => {
  const book = await Book.findByPk(bookId);
  book.set({
    id: bookId,
    title: title,
    authors: [authors],
    categories: [categories],
    price: price,
    stock: parseInt(stock),
    description: description
  });

  await book.save()
  return {message: 'Book modified successfully'};
}

module.exports = {putBook, getDeletedBooks, updateBookState, updateBookInfo};