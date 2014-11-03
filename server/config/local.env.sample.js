'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.
var facebookId = 1493891334209886;
var facebookSecret = '570baf4e1957e40c48bf5ab4211613f2';

// var twitterId = 1378528662-uaqI3CQcgRdmXtGFEsricSQbAGuf9fngr5JYVfg;
// var twitterSecret = 'zj3KQaMnKz7xQNh2Rw4lAl3iw69TbQMhuMEqpnOdyhVrK';

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'bars-secret',

  FACEBOOK_ID:      facebookId,
  FACEBOOK_SECRET:  facebookSecret,

  // TWITTER_ID:       twitterId,
  // TWITTER_SECRET:   twitterSecret,

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
