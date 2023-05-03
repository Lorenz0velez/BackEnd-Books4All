const {Router} = require('express');
const { User } = require('../DB_connection')

const { getAllUsers, getDetailUser, createUser, updateImageUser, updateProfile, addAdminRole, createFavorite, removeFavorite} = require('../controllers/userControllers');

const usersRouter = Router ();

usersRouter.get('/', async (req,res) => {
    try {
        let response = await getAllUsers()
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
});

usersRouter.get('/:name', async (req, res) => {
    let {name} = req.params;
    try {
        let response = await getDetailUser(name)
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
usersRouter.post('/addfavorite', async (req, res) => {
    let {name, book_id} = req.body;
    try {
        let response = await createFavorite(name, book_id)
        res.status(200).send(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).send({error: error.message})
    }
})
usersRouter.post('/removefavorite', async (req, res) => {
    let {name, book_id} = req.body;
    try {
        let response = await removeFavorite(name, book_id)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

usersRouter.put('/admin', async (req, res) => {
    let { name } = req.body;
    try {
        let user = await addAdminRole(name)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
})

usersRouter.put('/updateProfile/:name', async (req, res) => {
    const {name} = req.params;
    const {picture, email, alterName, about} = req.body;
    try {
        const updatedUser = await updateProfile(name, picture, email, alterName, about);
        res.status(200).send(updatedUser)
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})

usersRouter.put('/updateProfilePic/:name', async (req, res) => {
    const {name} = req.params;
    const {picture} = req.body;
    try {
        const updateUserImg = await updateImageUser(name, picture)
        res.status(200).send(updateUserImg.message)
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})



module.exports = usersRouter;
