var express = require('express');
var router = express.Router();
const ticket = require('../models/ticket');
const User = require('../models/user');

//Get the tickets submitted by a user.
router.get('/:userId/tickets', (req, res, next) => {  
  let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");
  let isLoggedInUserSelf = (req.user.user.id == req.params.userId);

  if(isLoggedInUserAdmin || isLoggedInUserSelf){
    User.findOne({ id : req.user.user.id}, function (err, user) {
      if (err) return next(err);
      if(user){
        ticket.find({ createdBy: user._id}).populate('technicians').populate('createdBy').populate('unit').exec(function(err, tickets) {
          if (err) return next(err);
          res.send(tickets);
        });
      }else{
        res.json({
          errorcode : 404,
          message : 'User Not Found.'
        });
        }
    });
  }else{
    res.json({
      errorcode : 403,
      message : 'Access Forbidden.'
    });
  }
});
module.exports = router;