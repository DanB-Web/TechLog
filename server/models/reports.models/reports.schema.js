const mongoose = require('mongoose');
const { reportsConnection } = require('../connections');

const Schema = mongoose.Schema;

let report = new Schema({

  reportId: {
    type: Number,
    required: true
  },
  
  title: {
    type: String,
    required: true
  },

  description: {
    type: String, 
    required: true
  },

  tags: {
    type: [String],
    required: true
  },

  steps: {
    type: [String],
    required: false
  },

  images: {
    type: [String],
    required: false
  }

}, { autoCreate: true }); 

const reportModel = reportsConnection.model('report', report);

module.exports = reportModel;