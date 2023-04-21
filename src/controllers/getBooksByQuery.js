const { Book } = require("../DB_connection");
const {Op} = require ('sequelize')
const getBooksByQuery = async (bookTitle) =>{
    bookTitle = bookTitle.charAt(0).toUpperCase() + bookTitle.slice(1).toLowerCase();
    
    const books = await Book.findAll({
        where: {
            title : {
            [Op.like] : `%${bookTitle}%`
            },
            active: true
        }
    })

    if(!books) throw new Error ('No matches found')

    return books;
}

module.exports = getBooksByQuery;