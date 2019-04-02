const express = require('express');
const http = require('http'); //http code module
const morgan = require('morgan'); // required to serve static file in the application
const bodyParser = require('body-parser'); //parses the body of the request and adds to the object req.body

const hostname = 'localhost';
const port = 3000;

const app = express(); //tell that our application will use the express node module

app.use(morgan('dev')); //development version - so print additional info
app.use(bodyParser.json());

//Express REST API methods
// /dishes -> Endpoint

//This code will be executed every time an API is called
app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next(); //operation not finished -> continue looking for the next one (e.g. PUT request)
});

//Specific to the kind of request
//GET - get the info
app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

//POST - new dish
app.post('/dishes', (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

//PUT - Update existing dish
app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});

//DELETE - delete a dish
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

//Doing the same thing for dishID
app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public')); //serve static files from this location - __dirname means root

app.use((req, res, next) => { //req -> request ; res -> response
  res.statusCode = 200; //Status code for the response -> if 200 then everything is ok
  res.setHeader('Content-Type', 'text/html'); //response type formatted in HTML
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app); //creating the server

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`); //use `` since we need to use a variable inside;
});
