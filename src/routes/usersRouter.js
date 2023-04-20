const {Router} = require('express');
const { getAllUsers, getDetailUser, createUser } = require('../controllers/userControllers');

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

module.exports = usersRouter;
