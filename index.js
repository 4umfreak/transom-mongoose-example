'use strict';
const opn = require('opn');
const Transom = require('@transomjs/transom-core');
const transomMongoose = require('@transomjs/transom-mongoose');

const transom = new Transom();

// const restify = require('restify');
// const restifyErrors = require('restify-errors');

// ****************************************************************************
// This app uses metadata from the API definition to define Mongoose models
// and pre-populate a local mongoose database with some seed data.
// CRUD endpoints are created that allow a full range of I/O operations.
// ****************************************************************************
const myApi = require('./myApi');
console.log('Running ' + myApi.name);

// const server = restify.createServer();

// My custom middleware
function isValidUser(req, res, next) {
  // Delayed resolution of the middleware.
  if (transom.registry.has('localUserMiddleware')) {
    const middleware = server.registry.get('localUserMiddleware');
    middleware.isLoggedInMiddleware()(req, res, next);
  } else {
    console.log('Fetching data without User verification!');
    next();
  }
}

// Register my TransomJS Mongoose module.
transom.configure(transomMongoose, {
  mongodbUri: 'mongodb://localhost/example-app',
  preMiddleware: [ isValidUser ]
});

// Initialize my TransomJS API metadata.
transom.initialize(myApi).then(function (server) {

  // ****************************************************************************
  // Define a simple index route with a few cool endpoints
  // ****************************************************************************
  server.get('/', function (req, res, next) {
    const links = [
      '/api/v1/db/animals',
      '/api/v1/db/animals?_skip=10&_limit=5',
      '/api/v1/db/person',
      '/api/v1/db/person/5a837e2e2c33ef01dc0deb9a',
      '/api/v1/db/person?balance=>800',
      '/api/v1/db/person?firstname=~K',
      '/api/v1/db/person?firstname=~K&_connect=billingaddress&_select=firstname,lastname',
      '/api/v1/db/animals/count?species=dog',
      '/api/v1/db/animals?species=!dog&_select=name',
      '/api/v1/db/animals?_sort=license',
      '/api/v1/db/animals?_sort=-license',
      '/api/v1/db/animals?name=~Stereo',
      '/api/v1/db/animals?name=~>Banana',
      '/api/v1/db/address',
      '/api/v1/db/address/5a78e25be59fb41992e867b0',
      '/api/v1/db/address?_connect=person.billingaddress',
      '/api/v1/db/address?_connect=person.billingaddress&_select=city,person_billingaddress.firstname',
      '/api/v1/db/address?_connect=person.billingaddress,person.shippingaddress&_select=address_line1,city,person_billingaddress.firstname,person_shippingaddress.firstname'
    ];

    let html = '<html><h1>Try a few of these GET request URLs.</h1>';
    for (var i = 0; i < links.length; i++) {
      html += `<li><a href="${links[i]}" target="_blank">${links[i]}</a></li>`;
    }
   
    html += `<br />You can also try this hand-hacked route:`;
    html += `<li><a href="${'/groupBySpecies'}" target="_blank">${'/groupBySpecies'}</a></li>`;
    
    html += `</html>`;

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(html);
  });

  server.get('groupBySpecies', function (req, res, next) {
    const mongoose = server.registry.get('mongoose');
    const Animals = mongoose.model('dynamic-animals')
    Animals.find({}, function (err, items) {
      if (err) {
        return next(err);
      }
      const result = {};
      for (var animal of items) {
        if (!result[animal.species]) {
          result[animal.species] = [];
        }
        result[animal.species].push(animal);
      }
      res.send(result);
    });
  });

  // ****************************************************************************
  // Handle 404 errors when a route is undefined.
  // ****************************************************************************
  server.get('.*', function (req, res, next) {
    var err = new Error(req.url + ' does not exist');
    err.status = 404;
    next(err);
  });

  // ****************************************************************************
  // Handle Errors within the app as our last middleware.
  // ****************************************************************************
  server.use(function (error, req, res, next) {
    console.error('Error handler', error);
    var data = {};
    data.error = error;
    res.statusCode = error.status || 501;
    res.send(data);
  });

  // ****************************************************************************
  // Start the Transom server...
  // ****************************************************************************
  server.listen(7090, function () {
    console.log(server.router.mounts);
    console.log('%s listening at %s', server.name, server.url);
    opn(server.url);
  });

});

// ****************************************************************************
// Handle uncaught exceptions within your code.
// ****************************************************************************
process.on('uncaughtException', function (err) {
  console.error('Really bad Error!', err);
});

// ****************************************************************************
// Handle uncaught rejections within your code.
// ****************************************************************************
process.on('unhandledRejection', function (err) {
  console.error('unhandledRejection', err);
});