const { Reviews, Book, User } = require("../DB_connection");
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
    if (user.email !== "not specified" || !user.email) {
      notificationSuccessReview(user, newReview, book);
    }
    await user.addReviews(newReview)

    return newReview;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReview = async (id) => {
  const review = await Reviews.findByPk(id)
  if (!review) {
    throw new Error('This review does not exist');
  }
  review.active = !review.active
  await review.save({ fields: ['active']})
  return {message: `This review is now ${review.active === true ? 'active' : 'disabled'}`}
}

const userReview = async (user) => {
  const uReview = await Reviews.findAll({ 
    where: { 
      user_name: user,
       active: true
      },
    include: {
      model: Book,
    }
    });
    return uReview
}


module.exports = { createReview, getAllReviews, getReviewDetail, deleteReview, userReview };
