/**
 * Main application routes
 */

'use strict';

const path = require('path');
const config = require('./config/environment');
const firebase = require("firebase");
const admin = require('firebase-admin');

//initialize firebase

const configCredentials = {
  databaseURL: config.firebase.databaseURL,
  credential: admin.credential.cert(config.firebase.serviceAccount)
}

admin.initializeApp(configCredentials);

module.exports = function(app) {

  // Insert routes below

  app.use('/api/things', require('./api/thing'));
  <% if (filters.auth) { %>app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  <% } %>

};
