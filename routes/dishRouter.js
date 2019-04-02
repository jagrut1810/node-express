const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router(); //declare an express router

dishRouter.use(bodyParser.json());

dishRouter.route('/') //takes an endpoint as a parameter; routes all methods to this router
//Express REST API methods
//This code will be executed every time an API is called
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next(); //operation not finished -> continue looking for the next one (e.g. PUT request)
})
//Specific to the kind of request
//GET - get the info
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
//POST - new dish
.post((req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
//PUT - Update existing dish
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});
//DELETE - delete a dish
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

module.exports = dishRouter;
