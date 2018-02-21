# transom-mongoose-example
This example demonstrates the transom-mongoose plugin for TransomJS.

Make sure that you have [Node.js](https://nodejs.org/en/download/) and [MongoDb](https://www.mongodb.com/download-center#community) installed locally. This example will connect on your local Mongo instance, and create a database `example-app` with some seed data.

https://transomjs.github.io/
## Usage
Clone the repo and run `npm install` in the project folder.
To run the example simply run `npm start`. This will start the server on the localhost on port 7090. You can point your browser to http://localhost:7090 to get a list of sample requests on the seed data. 

Note that this sample only demonstrates the GET requests. The transom-mongoose plugin also creates end points for insert (POST), update (PUT) and delete (DELETE). A small [Postman](https://www.getpostman.com/postman) collection is included to demonstrate those requests.

Please refer to the [transom-mongoose](https://transomjs.github.io/docs/transom-mongoose/) docs to learn more.

