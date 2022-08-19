const express = require('express');
const router = express.Router()

const {signup, login}  = require('../controllers/auth')

router.route('/login').post(login)
router.route('/signup').post(signup)

module.exports = router;