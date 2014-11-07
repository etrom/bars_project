/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Emails = require('./emails.model');

exports.register = function(socket) {
  Emails.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Emails.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('emails:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('emails:remove', doc);
}