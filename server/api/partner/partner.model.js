'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartnerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Partner', PartnerSchema);