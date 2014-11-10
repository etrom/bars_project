'use strict';

var _ = require('lodash');
var Emails = require('./emails.model');
var nodemailer = require('nodemailer');
var trans = require('./passwords');
var User = require('../user/user.model');


exports.sendRequest = function(req, res) {

  User.findById(req.body.reqFrom, function (err, user) {
  console.log(req.body.url, 'url');

      var mailOptions = {
            from: user.name +' has invited you to join Heart Bars ♥ <heartbarsmailer@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: '♥♥♥♥♥', // Subject line
            text: '♥♥♥♥♥', // plaintext body
            html: '<b><a href="http://localhost:9000' + req.body.url + '">signup now</a></b>' // html body
        };
        // send mail with defined transport object
        trans.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            } else{
                console.log('Message sent: ' + info.response);
                res.json(200, 'Message sent');
            }
        });
        if(err) { return handleError(res, err); }

  });
};


//lowbar reminder
// exports.lowBarReminder = function(req, res) {
// //send name
//   User.findById(req.body.partnerId, function (err, user) {
//   console.log(req.body.url, 'url');

//       var mailOptions = {
//             from: user.name +"s bars are getting low! ♥ <heartbarsmailer@gmail.com>", // sender address
//             to: req.body.email, // list of receivers
//             subject: '♥♥♥♥♥', // Subject line
//             text: '♥♥♥♥♥', // plaintext body
//             html: '<b><a href="http://localhost:9000' + req.body.url + '">submit</a></b>' // html body
//         };
//         // send mail with defined transport object
//         trans.sendMail(mailOptions, function(error, info){
//             if(error){
//                 console.log(error);
//             } else{
//                 console.log('Message sent: ' + info.response);
//                 res.json(200, 'Message sent');
//             }
//         });
//         if(err) { return handleError(res, err); }

//   });
// };

// Find all emails
exports.index = function(req, res) {
  Emails.find(function (err, emails) {
    if(err) { return handleError(res, err); }
    return res.json(200, emails);
  });
};

// Get a single emails
exports.show = function(req, res) {
  Emails.findById(req.params.id, function (err, emails) {
    if(err) { return handleError(res, err); }
    if(!emails) { return res.send(404); }
    return res.json(emails);
  });
};

// Creates a new emails in the DB.
exports.create = function(req, res) {
  Emails.create(req.body, function(err, emails) {
    if(err) { return handleError(res, err); }
    return res.json(201, emails);
  });
};

// Updates an existing emails in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Emails.findById(req.params.id, function (err, emails) {
    if (err) { return handleError(res, err); }
    if(!emails) { return res.send(404); }
    var updated = _.merge(emails, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, emails);
    });
  });
};

// Deletes a emails from the DB.
exports.destroy = function(req, res) {
  Emails.findById(req.params.id, function (err, emails) {
    if(err) { return handleError(res, err); }
    if(!emails) { return res.send(404); }
    emails.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}