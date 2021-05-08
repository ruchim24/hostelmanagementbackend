const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpError = require('./models/https-error');
const userRoutes = require('./routes/user-routes');

const app = express();

app.use(bodyParser.json());

app.use('/',userRoutes);

app.use((req,res,next) => {
    const error = new HttpError('Could not find this route',404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);

mongoose
.connect('mongodb+srv://tester:test123@cluster0.q4y4i.mongodb.net/hostelmanagement?retryWrites=true&w=majority')
.then(() => {
  app.listen(4000);
})
.catch(err => {
  console.log(err);
});
