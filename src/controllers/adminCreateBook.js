const { Reviews, Book, User } = require("../DB_connection");


const adminCreateBook = async(title, authors, categories, price, description, image, stock) => {

    const fechaActual = new Date();

    // Obtener el año actual
    const añoActual = fechaActual.getFullYear();
    
    // Obtener el mes actual (devuelve un valor entre 0 y 11)
    const mesActual = fechaActual.getMonth() + 1;
    
    // Obtener el día actual del mes (devuelve un valor entre 1 y 31)
    const diaDelMesActual = fechaActual.getDate();

    const date = `${añoActual}-${mesActual}-${diaDelMesActual}`
    
    try {
        if (stock) {
            const book = await Book.create({
                id: Math.floor((Math.random() * 1000)) + Date.now().toString(),
                title: title, 
                authors: [authors], 
                categories: [categories], 
                price: parseInt(price), 
                stock: parseInt(stock),
                description: description, 
                image: image,
                date: date
            })
            return book;
        } 
        const book = await Book.create({
            id: Math.floor((Math.random() * 1000)) + Date.now().toString(),
            title: title, 
            authors: [authors], 
            categories: [categories], 
            price: parseInt(price), 
            description: description, 
            image: image,
            date: date
        })
            return book;
        
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    adminCreateBook
}


