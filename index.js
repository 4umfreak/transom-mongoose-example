'use strict';

const Transom = require('@transomjs/transom-core');
const transomMongoose = require('@transomjs/transom-mongoose');

const transom = new Transom();

// ****************************************************************************
// This app uses metadata from the API definition to define Mongoose models
// and pre-populate a local mongoose database with some seed data.
// CRUD endpoints are created that allow a full range of I/O operations.
// ****************************************************************************
const myApi = require('./myApi');
console.log('Running ' + myApi.name);

// Register my TransomJS Mongoose module.
transom.configure(transomMongoose, {
  mongodbUri: 'mongodb://localhost/example-app'
});

// Initialize my TransomJS API metadata.
transom.initialize(myApi).then(function(server) {
  //

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
        'http://localhost:7090/api/v1/db/animals/count?species=dog',
        'http://localhost:7090/api/v1/db/animals?species=!dog&_select=name',
        'http://localhost:7090/api/v1/db/animals?_sort=license',
        'http://localhost:7090/api/v1/db/animals?_sort=-license',
        'http://localhost:7090/api/v1/db/animals?name=~Stereo',
        'http://localhost:7090/api/v1/db/animals?name=~>Banana',
        'http://localhost:7090/api/v1/db/address',
        'http://localhost:7090/api/v1/db/address/5a78e25be59fb41992e867b0',
        'http://localhost:7090/api/v1/db/address?_connect=person.billingaddress',
        'http://localhost:7090/api/v1/db/address?_connect=person.billingaddress&_select=city,person_billingaddress.firstname',
        'http://localhost:7090/api/v1/db/address?_connect=person.billingaddress,person.shippingaddress&_select=address_line1,city,person_billingaddress.firstname,person_shippingaddress.firstname'
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
  // Start the Transom server...
  // ****************************************************************************
  server.listen(7090, function() {
    console.log('%s listening at %s', server.name, server.url);
  });
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
