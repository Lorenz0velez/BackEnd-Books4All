const { Reviews, Book, User } = require("../DB_connection");


const adminCreateBook = async(title, authors, categories, price, description, image, stock) => {
    
    try {
        if (stock) {
            const book = await Book.create({
                title: title, 
                authors: [authors], 
                categories: [categories], 
                price: parseInt(price), 
                stock: parseInt(stock),
                description: description, 
                image: image
            })
            return book;
        } 
        const book = await Book.create({
            title: title, 
            authors: [authors], 
            categories: [categories], 
            price: parseInt(price), 
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


