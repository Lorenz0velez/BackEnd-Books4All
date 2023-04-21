const { Book } = require("../DB_connection");

const getAllBooks = async () => {

  return await Book.findAll({
    where: {
      active: true
    }
  });
};


module.exports = getAllBooks;
