const { Book } = require("../DB_connection");

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

module.exports = {putBook, getDeletedBooks};