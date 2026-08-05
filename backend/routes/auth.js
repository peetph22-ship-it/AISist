const express = require('express')
const router = express.Router()

const { registerStudent, registerMentor } = require('../controllers/registerController')
const { loginStudent, logoutStudent } = require('../controllers/loginController')

// create route
router.post('/register', registerStudent)
router.post('/registerMentor', registerMentor)
router.post('/login', loginStudent)
router.post('/logout', logoutStudent)

module.exports = router