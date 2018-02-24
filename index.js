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
// 
  
/////middlewares////
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/api', routes)
console.log('after route handler')
app.use(function(err, req, res, next){
    console.log(req);
    if(err){
        res.send(err.message);
    }
    next();
})
app.get('/', function(req, res){
    res.send('Go to /api to connect to the restAPI');
});


app.listen(process.env.PORT || 8080, function(){
    console.log('server started...');
});
