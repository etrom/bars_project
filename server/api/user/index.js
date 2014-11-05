'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('delete/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id/pair/:reqFrom', auth.isAuthenticated(), controller.updateRequest);
router.post('/:id/partnered/:reqFrom',auth.isAuthenticated(), controller.addPartner);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
