const { Reviews, Book } = require('../DB_connection');
const getAllReviews = async () => {
    const dbReviews = await Reviews.findAll({
        where:{
            active: true
        },
        include: {
            model: Book
        }
    })
    return dbReviews;
}

const getReviewDetail = async (id) => {
     const reviewDetail = await Reviews.findOne({
        where: {
            id: id,
            active: true
        }, 
        include: {
             model: Book
         }
     })
     return reviewDetail
}


const createReview = async (body, rating, book_id, user_name) => {
    try {

        const book = await Book.findByPk(book_id);
        if (!book) {
            throw new Error("No se encontró el libro");
        }


        const newReview = await Reviews.create({
            body,
            rating,
            book_id,
            user_name
        });


        await book.addReviews(newReview);

        return newReview;
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = { createReview, getAllReviews, getReviewDetail }