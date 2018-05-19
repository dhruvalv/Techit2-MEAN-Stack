var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

router.post('/', (req, res, next) => {

  let pass = req.body.password;  
  User.findOne({
    userName : req.body.username
  },(err, user) => {
    if (err) return next(err);
    if(user){
    bcrypt.compare(pass, user.hash).then(function(matched) {
       if(matched){
        res.json({
          token: jwt.sign({user}, jwtSecret)
        });
       }else{
        res.json({
          errorcode : '404',
          message : 'Invalid Username/Password'
        });
       }
    }); 
    } else{
      res.json({
        errorcode : '404',
        message : 'User not found'
      });
    } 
  });
});
module.exports = router;
