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

module.exports = {putBook, getDeletedBooks, updateBookState};