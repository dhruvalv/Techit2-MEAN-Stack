'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');


let userSchema = new mongoose.Schema({  
  type:{
    type: String,
    enum: ['REGULAR', 'ADMIN', 'SUPERVISOR', 'TECHNICIAN'],
    default: 'REGULAR'
  },
  id: Number,
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hash:{
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default:true
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: String,
  department: String,
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'Unit'
  }
});

autoIncrement.initialize(mongoose.connection);

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
      delete ret.hash;
      return ret;
  }
});

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 10000,
  incrementBy: 1
});

module.exports = mongoose.model('User', userSchema);