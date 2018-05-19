'use strict';

const mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

let ticketSchema = new mongoose.Schema({

  id:Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // reference
  },
  createdForName: String,
  createdForEmail: String,
  createdForPhone: String,
  createdForDepartment: String,
  subject:{
      type: String,
      required: true
  },
  details: String,
  location : String,
  unit:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit' //reference
  },
  technicians:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' //reference
  }], 
  updates:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Update' //reference
  }], 
  priority:{
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'LOW'
  },
  status:{
      type: String,
      enum:['OPEN', 'ASSIGNED', 'ONHOLD', 'COMPLETED', 'CLOSED'],
      default: 'OPEN'
  },
  dateAssigned: Date,
  dateUpdated: Date,
  dateClosed: Date
});
autoIncrement.initialize(mongoose.connection);
ticketSchema.plugin(autoIncrement.plugin, {
    model: 'Ticket',
    field: 'id',
    startAt: 500154,
    incrementBy: 1
  });



module.exports = mongoose.model('Ticket', ticketSchema);