const { Book } = require("../DB_connection");

const getAllBooks = async () => {

  const book = await Book.findAll({
    where: {
      active: true
    }
  });
  return book
};


module.exports = getAllBooks;
