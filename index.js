const express = require('express');
const http = require('http'); //http code module
const morgan = require('morgan'); // required to serve static file in the application
const bodyParser = require('body-parser'); //parses the body of the request and adds to the object req.body

const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express(); //tell that our application will use the express node module

app.use(morgan('dev')); //development version - so print additional info
app.use(bodyParser.json());

// /dishes -> Endpoint
app.use('/dishes', dishRouter);


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
