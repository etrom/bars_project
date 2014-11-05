/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Partner = require('./partner.model');

exports.register = function(socket) {
  Partner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Partner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('partner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('partner:remove', doc);
}