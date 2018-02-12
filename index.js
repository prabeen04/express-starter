const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/users');

const app = express();
// const MongoDB = 'mongodb://prabeen04:chicharito14@ds125368.mlab.com:25368/prabeen-restapi';

// mongoose.connect(MongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users');
//Get the default connection
// mongoose.connection.on('error', function() {
//     console.log('Could not connect to the database. Exiting now...');
//     process.exit();
// });

// mongoose.connection.once('open', function() {
//     console.log("Successfully connected to the database");
// })
//Bind connection to error event (to get notification of connection errors)

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
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
});
