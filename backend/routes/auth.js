const express = requrie('express')
const router = express.Router()

// connect to Controller file
const {registerController} = requrie('../controllers/registerController.js')