'use strict';

var _ = require('lodash');
var Bar = require('./bar.model');

///functions to manipulate db data for bar

// Get list of bars
exports.index = function(req, res) {
  //find by user id to get ids
  // google: passport user object not in req after fb login
  Bar.find(function (err, bars) {

    if(err) { return handleError(res, err); }
    return res.json(200, bars);
    // return as json so the FE can interpert
  });
};


exports.userBars = function(req, res) {
  // find by user id to get the users bars
  Bar.find({userId: req.params.user_id}, function (err, bars) {
    if(err) { return handleError(res, err); }
    return res.json(200, bars);
  });
};

// Get a single bar
exports.show = function(req, res) {
  Bar.findById(req.params.id, function (err, bar) {
    if(err) { return handleError(res, err); }
    if(!bar) { return res.send(404); }
    return res.json(bar);
  });
};

// Creates a new bar in the DB.
exports.create = function(req, res) {
  Bar.create(req.body, function(err, bar) {
    if(err) { return handleError(res, err); }
    return res.json(201, bar);
  });
};

// Updates an existing bar in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bar.findById(req.params.id, function (err, bar) {
    if (err) { return handleError(res, err); }
    if(!bar) { return res.send(404); }
    var updated = _.merge(bar, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, bar);
    });
  });
};

// Deletes a bar from the DB.
exports.destroy = function(req, res) {
  Bar.findById(req.params.id, function (err, bar) {
    if(err) { return handleError(res, err); }
    if(!bar) { return res.send(404); }
    bar.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}