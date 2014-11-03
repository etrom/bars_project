'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BarSchema = new Schema({
  name: String,
  fulfillment: Number,
  userId: String,
  partnerId: String
});

module.exports = mongoose.model('Bar', BarSchema);