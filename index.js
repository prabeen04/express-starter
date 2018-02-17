const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/users');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://prabeen04:chicharito14@ds125368.mlab.com:25368/prabeen-restapi');
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', routes)
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.send('Go to /api/users to connect to the restAPI');
});


app.listen(process.env.PORT || 8080, function(){
    console.log('server started...');
});
