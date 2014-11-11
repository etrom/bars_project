'use strict';

var express = require('express');
var controller = require('./bar.controller');

var router = express.Router();
var Bar = require('./bar.model');
var auth = require('../../auth/auth.service');

// router.get('/:id', controller.show); //not using want userBars to hit first
router.get('/', controller.index);
router.get('/:userId',auth.isAuthenticated(), controller.userBars);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id', controller.update);
// router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;