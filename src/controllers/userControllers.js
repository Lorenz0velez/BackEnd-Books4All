const { User, Bought, Role, Reviews, Book } = require("../DB_connection");

const { notificationNewUser } = require("./notificationNewUser");

const getAllUsers = async () => {
  const users = await User.findAll({
    include: [
      {
        model: Role,
        attributes: ["name"],
        through: {
          attributes: []
        }
      },
      {
        model: Bought,
        attributes: ["id", "books", "userId",  "createdAt"]
      },
      {
        model: Reviews,
        attributes: ["book_id", "body", "rating"]
      }
    ]
  })

  return users;
};

const getDetailUser = async (name) => {
  const userDetail = await User.findOne({
    where: {
      name: name,
    },
    include: [
      {
        model: Role,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Bought,
        attributes: ["id", "books", "userId",  "createdAt"]
      },
      {
        model: Reviews,
        attributes: ["book_id", "body", "rating"],
      },
      {
        model: Book,
        attributes: ["title", "image", "id", "categories"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return userDetail;
};

const createUser = async (nickname, picture, email) => {

  if (!email) email = "not specified";

  if (!(await getDetailUser(nickname))) {
    notificationNewUser(email, nickname);
  }

  const [user, created] = await User.findOrCreate({
    where: { name: nickname },
    defaults: { name: nickname, picture: picture, email: email },
  });

  const role = await Role.findOne({
    where: { name: "user" },
  });

  await user.addRole(role);

  return user;
};
const createFavorite = async (name, book_id) => {
  let user = await User.findOne({ where: { name: name } });
  let book = await Book.findByPk(book_id);

  await user.addBook(book);
  return "favorito agregado";
};
const removeFavorite = async (name, book_id) => {
  let user = await User.findOne({ where: { name: name } });
  let book = await Book.findByPk(book_id);

  await user.removeBook(book);
  return "favorito eliminado";
};

const addAdminRole = async (name) => {
  const user = await User.findOne({
    where: { name: name },
  });
  const role = await Role.findOne({
    where: { name: "admin" },
  });

  if (!user) {
    throw new Error("There is no user does not exists");
  }

  await user.addRole(role);

  return user;
};

const updateProfile = async (name, email, alterName, about) => {
  const user = await User.findOne({

    where: { name: name },
  });

  if (alterName) user.alterName = alterName;
  if (email) user.email = email;
  if (about) user.about = about;


  user.save();

  return { updatedUser: user, message: "Profile successfully updated" };
};

const updateUserState = async (name) => {
  const user = await User.findOne({
    where: { name: name },
    include: {
      model: Role,
      attributes: ["name"],
      through: {

        attributes: [],
      },
    },
  });
  if (user.Roles.at(-1).name === "admin") {
    throw new Error("Admins cannot be Blocked");
  }
  user.active = !user.active;

  user.save();


  return {
    message: `The user ${name} has changed their state active to ${user.active}`,
  };
};

const updateImageUser = async (name, picture) => {
  const user = await User.findOne({
    where: { name: name },
  });

  user.picture = picture;
  user.save();

  return { updatedUser: user, message: "Profile successfully updated" };
}




module.exports = {
  getAllUsers,
  getDetailUser,
  createUser,
  updateProfile,
  addAdminRole,
  updateUserState,
  createFavorite,
  removeFavorite,
  updateImageUser
};
