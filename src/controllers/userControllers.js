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

const createUser = async (nickname, picture, email) =>{

    if(!email) email = 'not specified'

    const [user, created ] = await User.findOrCreate({
        where: { name: nickname },
        defaults: { name: nickname, picture: picture, email: email }
      });

    const role = await Role.findOne({
        where:{name: 'user'}
    })

    await user.addRole(role)

    return user;
}

const addAdminRole = async (name) => {
    const user = await User.findOne({
        where: { name: name }        
    })
    const role = await Role.findOne({
        where:{ name: 'admin' }
    })

    if (!user) {
        throw new Error('There is no user does not exists')
    }

    await user.addRole(role)

    return user;
}

const updateProfile = async (name, picture, email, alterName, about) => {
    const user = await User.findOne({
        where: {name : name}
    })

    if(alterName)user.alterName = alterName;
    if(picture) user.picture = picture;
    if(email)user.email = email;
    if(about)user.about = about;

     user.save();
     
     return {updatedUser: user, message:'Profile successfully updated'};
  }
  
module.exports = {getAllUsers, getDetailUser, createUser, updateProfile, addAdminRole}