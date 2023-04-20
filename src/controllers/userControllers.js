const {User} = require('../DB_connection')

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

    return users
}

const getDetailUser = async (id) =>{
    const userDetail = await User.findOne({
        where:{
            id: id
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


module.exports = {getAllUsers, getDetailUser, createUser}