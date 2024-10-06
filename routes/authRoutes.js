const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')



router.post('/register',userController.UserRegsiter)

router.post('/login',userController.UserLogin)




module.exports = router