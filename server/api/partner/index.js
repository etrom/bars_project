'use strict';

var express = require('express');
var controller = require('./partner.controller');

var router = express.Router();

router.get('/send', controller.sendMail);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/submit', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;