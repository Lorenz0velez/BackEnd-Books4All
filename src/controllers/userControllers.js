const { User } = require("../DB_connection");
const { Role } = require("../DB_connection");
const { notificationNewUser } = require("./notificationNewUser");

const getAllUsers = async () =>{
    const users = await User.findAll({
        include:{
            model:Role,
            attributes: ["name"],
                through: {
                    attributes: [] 
            }
        }
    })


  return users;
};

const getDetailUser = async (name) =>{
    const userDetail = await User.findOne({
        where:{
            name: name,
        },
        include:{
            model:Role,
            attributes: ["name"],
                through: {
                    attributes: [] 
            }
        }
    })
    return userDetail
}


const createUser = async (nickname, picture, email) => {
  if (!email) email = "not specified";

  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: { name: nickname, picture: picture, email: email },
  });

  const role = await Role.findOne({
    where: { name: "user" },
  });

  await user.addRole(role);
  notificationNewUser(email, user);
  return user;
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

const updateProfilePic = async (name, newPic) => {
  const user = await User.findOne({
    where: { name: name },
  });
  user.picture = newPic;

     user.save();
     
     return {newPicture: user.picture, message: "Profile pic successfully updated"};
  }

const updateUserState = async (name) => {
    const user = await User.findOne({
        where: {name : name},
        include:{
            model:Role,
            attributes: ["name"],
                through: {
                    attributes: [] 
            }
        }
    })
    if (user.Roles.at(-1).name === 'admin') {
        throw new Error('Admins cannot be Blocked')
    }
    user.active = !user.active

    user.save();

    return {message: `The user ${name} has changed their state active to ${user.active}`}
}
  
module.exports = {getAllUsers, getDetailUser, createUser, updateProfilePic, addAdminRole, updateUserState}

