'use strict';

var express = require('express');
var controller = require('./bar.controller');

var router = express.Router();
var Bar = require('./bar.model');
var auth = require('../../auth/auth.service');

router.get('/', controller.index);
// This is the same as:
// router.get('/', function(req, res) {
//   Bar.find(function (err, bars) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, bars);
//     // return as json so the FE can interpert
//   });
// });
// router.get('/:id', controller.show);
router.get('/:userId',auth.isAuthenticated(), controller.userBars);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;