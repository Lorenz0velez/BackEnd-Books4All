const { Book } = require("../DB_connection");
const {Op} = require ('sequelize')
const getBooksByQuery = async (bookTitle) =>{
    let search = bookTitle.toLowerCase().split(" ")
    for (let i = 0; i < search.length; i++) {
        search[i] = search[i][0].toUpperCase() + search[i].substr(1);
    }
    let searchBook = search.join(" ");
    const books = await Book.findAll({
        where: {
            title : {
            [Op.like] : `%${searchBook}%`
            },
            active: true
        }
    })

    if(!books) throw new Error ('No matches found')

    return books;
}

module.exports = getBooksByQuery;