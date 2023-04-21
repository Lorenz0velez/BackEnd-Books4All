const {User} = require('../DB_connection')
const {Role} = require('../DB_connection')

const getAllUsers = async () =>{
    const users = await User.findAll({
        where:{
            active: true
        },
        include:{
            model:Role,
            attributes: ["name"],
                through: {
                    attributes: [] 
                }
        }
    })

    return users
}

const getDetailUser = async (name) =>{
    const userDetail = await User.findOne({
        where:{
            name: name,
            active: true
        }
    })
    return userDetail
}

const createUser = async (nickname, picture, email) =>{

    if(!email) email = 'not specified'

    const [user, created ] = await User.findOrCreate({
        where: { email: email },
        defaults: { name: nickname, picture: picture, email: email }
      });

    const role = await Role.findOne({
        where:{name: 'user'}
    })

    await user.addRole(role)

    return user;
}

const updateProfilePic = async (name, newPic) => {
    const user = await User.findOne({
        where: {name : name}
    })
     user.picture=newPic;

     user.save();
     
     return {newPicture :user.picture, message:'Profile pic successfully updated'};
  }
  
module.exports = {getAllUsers, getDetailUser, createUser, updateProfilePic}