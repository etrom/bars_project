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
  Bar.find({userId: req.params.userId}, function (err, bars) {
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
  console.log(req.body);
  Bar.create(req.body, function(err, bar) {
    if(err) { return handleError(res, err); }
    return res.json(201, bar);
  });
};
///update fulfillment value by 10, 30 or 50
exports.update = function(req, res){
  console.log(req.body, 'body');
  console.log(req.params, 'params');
  Bar.findById(req.params.id, function(err,bar) {
    if(err) {return res.send(500, err)};
      if (req.body.fulfillment === 10){
        bar.fulfillment += 10;
        if (bar.fulfillment > 100){
          bar.fulfillment = 100;
        }
        console.log(bar);
      }
      if (req.body.fulfillment === 30){
        bar.fulfillment += 30;
        if (bar.fulfillment > 100){
          bar.fulfillment = 100;
          console.log(bar);
        }
        console.log(bar);
      }
       if (req.body.fulfillment === 50){
        bar.fulfillment += 50;
        if (bar.fulfillment > 100){
          bar.fulfillment = 100;
          console.log(bar);
        }
        console.log(bar);
      }
      bar.save();
      res.json(200, bar);
    });
};

// Updates an existing bar in the DB.
exports.updateBars = function(req, res) {
  console.log('hit');
  if(req.body._id) { delete req.body._id; }
  Bar.findById(req.params.id, function (err, bar) {
    if (err) { return handleError(res, err); }
    if(!bar) { return res.send(404); }
    bar.reminded = true;
    bar.markModified('reminded');
    bar.save(function (err, newlySaved, numModified) {
      Bar.findById(req.params.id, function(err, bar) {
        console.log('regotten bar:', bar);
      })
      console.log("number modified", numModified);
      if (err) { return handleError(res, err); }
      return res.json(200, newlySaved);
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