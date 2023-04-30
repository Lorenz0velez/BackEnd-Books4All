const { Reviews, Book, User } = require("../DB_connection");


const adminCreateBook = async(id, title, authors, categories, price, description,image) => {
    
    try {
        const book = await Book.create({
            id: id,
            title: title, 
            authors: authors, 
            categories: categories, 
            price: price, 
            description: description, 
            image: image
        })

          return book;
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    adminCreateBook
}


