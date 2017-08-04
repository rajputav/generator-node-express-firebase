/**
 * Express configuration
 */

'use strict';

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const config = require('./environment');<% if (filters.auth) { %>
const passport = require('passport');<% } %><% if (filters.twitterAuth) { %>
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');<% } %>

module.exports = function(app) {
  const env = app.get('env');

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  <% if (filters.auth) { %>app.use(passport.initialize());<% } %><% if (filters.twitterAuth) { %>

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: '<%= _.slugify(_.humanize(appname)) %>'
    })
  }));
  <% } %>
  if ('production' === env) {
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};