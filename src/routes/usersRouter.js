const {Router} = require('express');
const { User } = require('../DB_connection')
const { getAllUsers, getDetailUser, createUser } = require('../controllers/userControllers');
const { loginCtrl, registerCtrl } = require('../controllers/auth');



const usersRouter = Router ();

usersRouter.get('/', async (req,res) => {
    const {queryUser} = req.query;
    try {
        let response = await getAllUsers()
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
});

usersRouter.get('/:userId', async (req, res) => {
    let {id} = req.params;
    try {
        let response = await getDetailUser(id)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

usersRouter.post('/', async (req, res) =>{
    let {nickname, picture, email} = req.body;
    try {
        let user = await createUser(nickname, picture, email)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

usersRouter.put('/:userId', (req, res) => {
    try {
        const id = req.params.userId;   // obtiene el Id por params
        const user = User.find((user) => user.id === id);   // busca en DB un el usuario
        if (!user) {
            return res.status(404).send('User not found');  // si no lo encuentra retorna 'User not found
        }

        user.role = 'admin';    // si encuentra el user, cambia su propiedad rol a 'admin'

        return res.status(200).send(user)   // retorna el usuario

    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})

usersRouter.post('/login', loginCtrl)



module.exports = usersRouter;
