var express = require('express');
var router = express.Router();
const Ticket =  require('../models/ticket');
const Unit =  require('../models/unit');
const Update =  require('../models/update');

//	Create a new ticket.
router.post('/', function(req, res, next) {
  if(!req.body.createdForEmail ||  req.body.createdForEmail=='' || !req.body.subject || req.body.subject == '' || !req.body.unit || req.body.unit== null){
        res.json({
          errorcode : 400,
          message : "CreatedBy and/or Email and/or Subject and/or Unit is/are missing in the request"
        });
  }else{    
    Unit.findOne({
      id : req.body.unit
    }).exec(function(err, unit) {
      if(unit){
        req.body.createdBy = req.user.user._id;
        let newTicket = new Ticket(req.body);
        newTicket.unit = unit;
        newTicket.save(function (err) {
          if (err) return next(err);
        });
        res.json(newTicket);
      }else{
        res.json({
          errorcode : 404,
          message : "Unit Not Found"
        });
      }
    });
  }
});

// Get the technicians assigned to a ticket.
router.get('/:ticketId/technicians', function(req, res, next) {

  Ticket.findOne({
    id : req.params.ticketId
  }).populate('technicians').populate('createdBy').exec(function(err, ticket) {
    if(err) return next(err);
    if(ticket){

      let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");
      let isLoggedInUserCreator = (req.user.user.id == ticket.createdBy.id);
      let isLoggedInUserTechnician = false;

      ticket.technicians.forEach(function(technician) {
        if(technician.id == req.user.user.id){
          isLoggedInUserTechnician = true;
        }
      }, this);
      
      if(isLoggedInUserAdmin || isLoggedInUserCreator || isLoggedInUserTechnician){
        res.json(ticket.technicians)
      }else{
        res.json({
          errorcode : 403,
          message : "Access Forbidden"
        });
      }
    }else{
      res.json({
        errorcode : 404,
        message : "Ticket Not Found"
      });
    }
  });
});

router.get('/:ticketId/technicians', function(req, res, next) {

  Ticket.findOne({
    id : req.params.ticketId
  }).populate('technicians').populate('createdBy').exec(function(err, ticket) {
    if(err) return next(err);
    if(ticket){

      let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");
      let isLoggedInUserCreator = (req.user.user.id == ticket.createdBy.id);
      let isloggedInUserTechnician = false;

      ticket.technicians.forEach(function(technician) {
        if(technician.id == req.user.user.id){
          isLoggedInUserTechnician = true;
        }
      }, this);
      
      if(isLoggedInUserAdmin || isLoggedInUserCreator || isloggedInUserTechnician){
        res.json(ticket.technicians)
      }else{
        res.json({
          errorcode : 403,
          message : "Access Forbidden"
        });
      }
    }else{
      res.json({
        errorcode : 404,
        message : "Ticket Not Found"
      });
    }
  });
});

// Set the status of a ticket.
router.put('/:ticketId/status/:status', function(req, res, next) { 
  let newStatus = req.params.status.toUpperCase();

  if(!Ticket.schema.obj.status.enum.includes(newStatus)){
    res.json({
      errorcode : 500,
      message : req.params.status + " is not a valid Status"
    });
  }else{
    Ticket.findOne({
     id : req.params.ticketId
     }).populate('technicians').exec(function(err, ticket) {
     if(err) return next(err);
      if(ticket){
        let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");        
        let isLoggedInUserTechnician = false;

        ticket.technicians.forEach(function(technician) {
          if(technician.id == req.user.user.id){
            isLoggedInUserTechnician = true;
          }
        }, this);
        
        if(isLoggedInUserAdmin || isLoggedInUserTechnician){
          ticket.status = newStatus;
          ticket.dateUpdated = new Date();
          if(newStatus == 'CLOSED'){
            ticket.dateClosed = new Date();
          }
          let newUpdate = new Update(req.body);
          if(req.body.message){
            newUpdate.details = req.body.message;
          }
          newUpdate.ticket = ticket._id;
          newUpdate.technician = req.user.user._id;
          newUpdate.date = new Date();
          newUpdate.save(function (err) {
              if (err) return next(err);
          });

          ticket.updates.push(newUpdate);
          ticket.save(function (err) {
            if (err) return next(err);
          });
          res.json(ticket);
        }else{
          res.json({
            errorcode : 403,
            message : "Access Forbidden"
          });
        }
      }else{
      res.json({
        errorcode : 404,
        message : "Ticket Not Found"
      });
    }
  });
}
});

// Set the priority of a ticket.
router.put('/:ticketId/priority/:priority', function(req, res, next) {
  let newPriorty = req.params.priority.toUpperCase();
  if(!Ticket.schema.obj.priority.enum.includes(newPriorty)){
    res.json({
      errorcode : 500,
      message : req.params.priority + " is not a valid priority"
    });
  }else{
    Ticket.findOne({
     id : req.params.ticketId
     }).populate('technicians').exec(function(err, ticket) {
      if(err) return next(err);
      if(ticket){
        let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");        
        let isloggedInUserTechnician = false;
  
        ticket.technicians.forEach(function(technician) {
          if(technician.id == req.user.user.id){
            isloggedInUserTechnician = true;
          }
        }, this);

        if(isLoggedInUserAdmin || isloggedInUserTechnician){
          ticket.priority = newPriorty;
          ticket.save(function (err) {
            if (err) return next(err);
          });
        res.json(ticket);
        }else{
          res.json({
            errorcode : 403,
            message : "Access Forbidden"
          });
        }
      }else{
      res.json({
        errorcode : 404,
        message : "Ticket Not Found"
      });
    }
  });
}
});


router.get('/', function(req, res, next) {
  let isLoggedInUserAdmin = (req.user.user.type == "ADMIN");
  if(isLoggedInUserAdmin){
    Ticket.find().populate('technicians').populate('createdBy').populate('unit').populate('updates').exec(function(err, tickets) {
      if (err) return next(err);
      res.json(tickets)

    })
  }else{
        Ticket.find({ 
          'createdBy': req.user.user._id 
        }).populate('technicians').populate('createdBy').populate('unit').populate('updates').exec(function(err, tickets) {
          if (err) return next(err);
          res.json(tickets)
        })
  }
});

module.exports = router;
