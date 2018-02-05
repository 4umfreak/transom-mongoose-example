'use strict';

const Transom = require('@transomjs/transom-core');
const transomMongoose = require('@transomjs/transom-mongoose');

const transom = new Transom();

// ****************************************************************************
// This sample app doesn't use any metadata from the API definition.
// ****************************************************************************
const myApi = require('./myApi');
console.log('Running ' + myApi.name);

// Register my TransomJS Mongoose module.
transom.configure(transomMongoose, {
  mongodbUri: 'mongodb://localhost/example-app'
});

// Initialize my TransomJS API metadata.
const server = transom.initialize(myApi);

// ****************************************************************************
// Define a simple index route with a few endpoints
// ****************************************************************************
server.get('/', function(req, res, next) {

  console.log('Registry keys:', server.registry.keys);
  res.json({
    message: 'Try a few of these GET request URLs.',
    'api-endpoints': [
        'http://localhost:7090/api/v1/db/animals',
        'http://localhost:7090/api/v1/db/animals/5a78d26d0a942611291fd1cf',
        'http://localhost:7090/api/v1/db/person',
        'http://localhost:7090/api/v1/db/person/5a78e25be59fb41992e867b7',
        'http://localhost:7090/api/v1/db/person?balance=>800',
        'http://localhost:7090/api/v1/db/person?firstname=~K',
        'http://localhost:7090/api/v1/db/person?firstname=~K&_connect=billingaddress&_select=firstname,lastname',
        'http://localhost:7090/api/v1/db/address',
        'http://localhost:7090/api/v1/db/address/5a78e25be59fb41992e867b0',
        'http://localhost:7090/api/v1/db/address/5938c946babe673a99ae53a3?_connect=person.billingaddress'
      ]
  });
});

// ****************************************************************************
// Handle 404 errors when a route is undefined.
// ****************************************************************************
server.get('.*', function(req, res, next) {
  var err = new Error(req.url + ' does not exist');
  err.status = 404;
  next(err);
});

// ****************************************************************************
// Handle Errors within the app as our last middleware.
// ****************************************************************************
server.use(function(error, req, res, next) {
  console.error('Error handler', error);
  var data = {};
  data.error = error;
  res.statusCode = error.status || 501;
  res.send(data);
});

// ****************************************************************************
// Handle uncaught exceptions within your code.
// ****************************************************************************
process.on('uncaughtException', function(err) {
  console.error('Really bad Error!', err);
});

// ****************************************************************************
// Handle uncaught rejections within your code.
// ****************************************************************************
process.on('unhandledRejection', function(err) {
  console.error('unhandledRejection', err);
});

// ****************************************************************************
// Start the Transom server...
// ****************************************************************************
server.listen(7090, function() {
  console.log('%s listening at %s', server.name, server.url);
});
