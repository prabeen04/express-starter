const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.get('/api', function(req, res){
    res.send('response received');
});

app.listen(8080, function(){
    console.log('server started...');
});
