const axios = require('axios');
const { Book } = require('../DB_connection')

const apiKey = "AIzaSyDfSGq9pn2rOO_VgI9pMtW07f8LAv_kI28"

// Esta función me permite obtener los libros de la  API de google y almacenar la información en la base de datos

const getBooks = async () => {

    const categories = [
        "Art",
        "Fiction",
        "Biography",
        "Business",
        "Cooking",
        "Drama",
        "Fantasy",
        "Education",
        "History",
        "Horror",
        "Humor",
        "Comedy",
        "Juvenile",
        "Philosophy",
        "Romance",
        "Science",
        "Suspense",
        "Sports",
        "Travel"
    ];

    let allBooks = [];
    let genres = []
    for (let i = 0; i < categories.length; i++) {

        const response = await axios(`https://www.googleapis.com/books/v1/volumes?q=subject:${categories[i]}&maxResults=10&orderBy=relevance&key=${apiKey}`);
        const data = response.data.items;
        const books = data.map(book => {
            const randoPrice = (Math.random() * (25 - 10) + 10).toFixed(2);

            book.volumeInfo.categories?.forEach(element => {
                genres.push(element)
            });
            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                categories: book.volumeInfo.categories,
                image: book.volumeInfo.imageLinks?.smallThumbnail,
                price: randoPrice,
                stock: 30
            }
        })

        for (let j = 0; j < books.length; j++) {
            const bookExists = await Book.findOne({ where: { id: books[j].id } });
            if (!bookExists) {
                await Book.create(books[j]);
            }
        }

        allBooks = [...allBooks, ...books]

    }
    let allGenres = [];
    genres.forEach(genre => {
        if (!allGenres.includes(genre)) {
            allGenres.push(genre)
        }
    })
    console.log("entra a la api");
    return allBooks

}


module.exports = {
    getBooks
}