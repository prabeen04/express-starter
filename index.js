const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/users');

const app = express();

mongoose.connect(MongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
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
    res.send('Go to /api to connect to the restAPI');
});


app.listen(process.env.PORT || 8080, function(){
    console.log('server started...');
    console.log(db);
});
