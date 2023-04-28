const { Bought, User, Book } = require("../DB_connection");

async function createBought(user, booksToBuyArray) {
  const userRecord = await User.findByPk(user);
  if (!userRecord) {
    throw new Error("Usuario no encontrado");
  }

  const books = await Book.findAll({
    where: { id: booksToBuyArray.map((b) => b.bookId) }, // Filtrar los libros por bookId
  });

  const boughtBooks = booksToBuyArray.map((b) => {
    const book = books.find((x) => x.id === b.bookId);

    if (!book) {
      throw new Error(`Libro con id ${b.bookId} no encontrado`);
    }

    return {
      bookId: book.id,
      title: book.title,
      image: book.image,
      authors: book.authors,
      categories: book.categories,
      price: book.price,
      quantity: b.quantity,
      subtotal: book.price * b.quantity,
    };
  });
  const total = boughtBooks.reduce((acc, book) => acc + book.subtotal, 0);
  const bought = await Bought.create({
    books: boughtBooks,
    userId: userRecord.id,
  
  });


  await userRecord.addBought(bought);
  return bought
}
module.exports = { createBought };
