'use strict';

const mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
let updateSchema = new mongoose.Schema({

    id: Number,
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' // reference
    },
    technician:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // reference
    },
    details: String,
    date: Date
});
autoIncrement.initialize(mongoose.connection);
updateSchema.plugin(autoIncrement.plugin, {
    model: 'Update',
    field: 'id',
    startAt: 1,
    incrementBy: 1
  });

module.exports = mongoose.model('Update', updateSchema);