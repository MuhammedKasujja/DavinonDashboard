// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var routes = require('./routes/index');

var app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// Define the static file path
app.use(express.static(__dirname+'/Uploads'));
app.use('/api', routes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  module.exports = app;