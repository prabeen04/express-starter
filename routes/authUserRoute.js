const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var AuthUser = require('../models/authUsers');

router.get('/register', function(req, res, next){
    res.send('get is working');
})

router.post('/register', function(req, res, next){
    var user = req.body;
    console.log(user);
    res.send('post is working');
})

module.exports = router;