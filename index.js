const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const routes = require('./routes/users');

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://prabeen04:chicharito14@ds125368.mlab.com:25368/prabeen-restapi');
mongoose.connect('mongodb://localhost/users');
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
/////middlewares////
app.use(cors());
// app.use('/api', routes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/api', routes)
app.get('/', function(req, res){
    res.send('Go to /api to connect to the restAPI');
});


app.listen(process.env.PORT || 8080, function(){
    console.log('server started...');
});
