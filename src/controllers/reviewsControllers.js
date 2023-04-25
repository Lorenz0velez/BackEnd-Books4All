const { Reviews, Book } = require("../DB_connection");
const {
  notificationSuccessReview,
} = require("../controllers/notificationSuccessReview");
const { getDetailUser } = require("./userControllers");

const getAllReviews = async () => {
  const dbReviews = await Reviews.findAll({
    where: {
      active: true,
    },
    include: {
      model: Book,
    },
  });
  return dbReviews;
};

const getReviewDetail = async (id) => {
  const reviewDetail = await Reviews.findOne({
    where: {
      id: id,
      active: true,
    },
    include: {
      model: Book,
    },
  });
  return reviewDetail;
};

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
      user_name,
    });

    await book.addReviews(newReview);
    const user_name_test = newReview.user_name;
    const user = await getDetailUser(user_name_test);
    notificationSuccessReview(user, newReview, book);

    return newReview;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { createReview, getAllReviews, getReviewDetail };
