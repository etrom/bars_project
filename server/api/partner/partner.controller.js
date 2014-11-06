'use strict';

var _ = require('lodash');
var Partner = require('./partner.model');
var User = require('../user/user.model');

// Get list of partners
exports.index = function(req, res) {
  Partner.find(function (err, partners) {
    if(err) { return handleError(res, err); }
    return res.json(200, partners);
  });
};

// Get a single partner
exports.show = function(req, res) {
  User.find({email: req.body.email}, function(err, partner) {
    if(err) { return handleError(res, err); }
    if(partner.length < 1) {
      console.log('no partner found');
      return res.json(200, {message: "this user does not exist"});
    }
     res.json(200, partner);
  });
};

// Creates a new partner in the DB.
exports.create = function(req, res) {
  Partner.find(req.body, function(err, partner) {
    if(err) { return handleError(res, err); }
    return res.json(201, partner);
  });
};

// Updates an existing partner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Partner.findById(req.params.id, function (err, partner) {
    if (err) { return handleError(res, err); }
    if(!partner) { return res.send(404); }
    var updated = _.merge(partner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, partner);
    });
  });
};

// Deletes a partner from the DB.
exports.destroy = function(req, res) {
  Partner.findById(req.params.id, function (err, partner) {
    if(err) { return handleError(res, err); }
    if(!partner) { return res.send(404); }
    partner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}