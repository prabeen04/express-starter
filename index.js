const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/users');
const postsroutes = require('./routes/posts');
const authUserRoute = require('./routes/authUserRoute');
var cors = require('cors')
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://prabeen04:chicharito14@ds125368.mlab.com:25368/prabeen-restapi');
// mongoose.connect('mongodb://localhost/users');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// 

/////middlewares////
// cors middleware
app.use(cors())

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
})); 
app.use(passport.initialize());
// route handler middleware
app.use('/api', [routes, postsroutes, authUserRoute]);
// error handling middleware
app.use(function (err, req, res, next) {
    console.log('inside error handler middle ware')
    if (err) {
        console.log('inside error handler middle ware')
        res.send(err.message);
    }
    next();
})
app.get('/', function (req, res) {
    res.send('Go to /api to connect to the restAPI');
});


app.listen(process.env.PORT || 8080, function () {
    console.log('server started...');
});
