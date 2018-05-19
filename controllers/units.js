var express = require('express');
var router = express.Router();
const Ticket = require('../models/ticket');
const Unit = require('../models/unit');
const User = require('../models/user');

//Get the technicians of a unit.
router.get('/:unitId/technicians', (req, res, next) => {
  
  let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");
  let isLoggedInUserSupervisor = false;
  let isLoggedInUserTechnician = false;
  
  Unit.findOne({
    id : req.params.unitId
  }).populate('technicians').populate('supervisors').exec(function(err, unit) {
    if (err) return next(err);
    if(unit){
      unit.technicians.forEach(function(technician) {
        if(technician.id == req.user.user.id){
          isLoggedInUserTechnician = true;
        }
      }, this);
      
      unit.supervisors.forEach(function(supervisor) {
        if(supervisor.id == req.user.user.id){
          isLoggedInUserSupervisor = true;
        }
      }, this);
      
      if(isLoggedInUserAdmin || isLoggedInUserSupervisor || isLoggedInUserTechnician){
          res.json(unit.technicians);
      }else{
        res.json({
          errorcode : '403',
          message : 'Access Forbidden'
        });
      }
    }else{
      res.json({
        errorcode : '404',
        message : 'Unit not found'
      });
    }
  });
});

// Get the tickets submitted to a unit.
router.get('/:unitId/tickets', (req, res, next) => {

  let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");
  let isLoggedInUserSupervisor = false;
  let isLoggedInUserTechnician = false;

  Unit.findOne({
    id : req.params.unitId
  }).populate('technicians').populate('supervisors').exec(function(err, unit) {
    if (err) return next(err);
    if(unit){
      unit.technicians.forEach(function(technician) {
        if(technician.id == req.user.user.id){
          isLoggedInUserTechnician = true;
        }
      }, this);
      
      unit.supervisors.forEach(function(supervisor) {
        if(supervisor.id == req.user.user.id){
          isLoggedInUserSupervisor = true;
        }
      }, this);
      
      if(isLoggedInUserAdmin || isLoggedInUserSupervisor || isLoggedInUserTechnician){
        Ticket.find({
          unit : unit._id
        }).populate('createdBy').populate('technicians').exec(function(err, tickets) {
          if (err) return next(err);
          if(tickets){
            res.json(tickets);
          }else{
            res.json({
              errorcode : '404',
              message : 'Ticket not found'
            });
          }
        }); 
      }else{
        res.json({
          errorcode : '403',
          message : 'Access Forbidden'
        });
      }
    }else{
      res.json({
        errorcode : '404',
        message : 'Unit not found'
      });
    }
  }); 
});

module.exports = router;
