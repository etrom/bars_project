'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmailsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Emails', EmailsSchema);