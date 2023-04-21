const { Book, Reviews } = require("../DB_connection");


const getOneBook = async (bookId) => {
  const book = await Book.findAll({
    where: { id: bookId, active: true },
    include: [Reviews]
  });

  return book;
};

module.exports = getOneBook;
