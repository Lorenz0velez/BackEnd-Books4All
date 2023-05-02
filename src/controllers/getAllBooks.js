const { Book, Reviews } = require("../DB_connection");

const getAllBooks = async () => {

  const book = await Book.findAll({
    where: {active: true},
    include: [Reviews]
  });
  return book
};


module.exports = getAllBooks;
