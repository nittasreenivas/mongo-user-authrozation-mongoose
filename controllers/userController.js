
const User = require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv/config')

let secret = process.env.WhatIsYourName

const UserRegsiter = async (req,res) => {
   const {username,password,role} = req.body
   try{
      const user = await User.findOne({username})
      if(user){
        return res.status(404).json({err:` user with ${username} already exists `})
      }
      const hashedPassword = await bcrypt.hash(password,10)
      const newUser = new User({
        username,
        password:hashedPassword,
        role
      })
      await newUser.save()
      return res.status(200).json({msg:'user register succes',newUser})
   }catch(err){
    return res.status(500).json({err:"internal server error"})
   }
}

const UserLogin = async(req,res) => {
    const {username,password} = req.body 
    try{
        const user = await User.findOne({username})
        if(!user){
          return res.status(404).json({err:` user with ${username} not found `})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({err:' invalid credentails'})
        }
        var token = jwt.sign({ id:user._id,role:user.role },secret,{expiresIn: "1h"} );
        console.log('token',token)
        return res.status(200).json({token})

    }catch(err){
        return res.status(500).json({err:"internal server error"})
    }

}

module.exports = {UserRegsiter,UserLogin}