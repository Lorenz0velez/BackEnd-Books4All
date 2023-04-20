const { tokenSign, verifyToken } = require('./generateToken')
const { User } = require('../DB_connection')
const { compare } = require('./compare')

const loginCtrl = async (req, res) => {
    try {
        const { name, password } = req.body

        const user = await User.findOne({ 
           where: { name: name }
         });

         if (!user) {
            res.status(404)
            res.send({ error: 'User not found' });
         }

        const checkPassword = compare(password, user.password)
        const tokenSession = await tokenSign(user);
        if (checkPassword) {
            return res.status(200).send({
                data: user,
                tokenSession
            })
            
        } else {
            return res.status(404).send('Invalid user or password')
        }

    } catch (error) {
        res.status(404).send({ error: error.message });
    }
}


const logoutCtrl = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = { loginCtrl }