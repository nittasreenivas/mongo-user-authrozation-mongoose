const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth') 

// only admin
router.get('/admin', verifyToken, (req, res) => {
  res.json({msg:"welcome admin"})
})
// both admin and manager
router.get('/manager', (req, res) => {
    res.json({msg:"welcome manager"})
  })
// alll can access
  router.get('/user', (req, res) => {
    res.json({msg:"welcome user"})
  })

module.exports = router