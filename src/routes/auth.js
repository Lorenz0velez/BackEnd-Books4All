const { Router } = require('express');

const router = Router();

const { loginCtrl, registerCtrl } = require('../controllers/auth');

router.post('/login', loginCtrl)

router.post('/register', registerCtrl)

module.exports = router;