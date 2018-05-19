'use strict';

const mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

let unitSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true        
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: String,
    email: String,
    phone: String,
    description: String,
    supervisors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //reference
    }],
    technicians: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //reference
    }],
});
autoIncrement.initialize(mongoose.connection);
unitSchema.plugin(autoIncrement.plugin, {
    model: 'Unit',
    field: 'id',
    startAt: 50,
    incrementBy: 1
  });



module.exports = mongoose.model('Unit', unitSchema);