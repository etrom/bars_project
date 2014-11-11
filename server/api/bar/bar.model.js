'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BarSchema = new Schema({
  name: String,
  depInterval: Number,
  fulfillment: Number,
  userId: String,
  // {type: Schema.Types.ObjectId, ref: 'User'}
  partnerId: String,
  reminded: {type: Boolean, default: false}
});

module.exports = mongoose.model('Bar', BarSchema);