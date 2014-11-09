'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    // successRedirect: '/home',
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    // successRedirect: '/home',
    failureRedirect: '/signup',

    session: false
  }), auth.setTokenCookie)

  .get('/:id', function(req,res,next) {
    console.log('/auth/facebook/callback/' + req.params.id);
    passport.authenticate('facebook', {
      callbackURL: '/auth/facebook/callback/' + req.params.id,
      scope: ['email', 'user_about_me'],
      failureRedirect: '/signup',
      // successRedirect: '/home',
      session: false
    })(req,res,next)
  })

  .get('/callback/:id', function(req,res,next) {
    console.log('then this should happen')
    passport.authenticate('facebook', {
      // successRedirect: '/home',
      // callbackURL:"/auth/facebook/callback/" + req.params.id + '/',
      failureRedirect: '/signup',

      session: false
    })(req,res,next),
    auth.setTokenCookie
  });

module.exports = router;