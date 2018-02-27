const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var AuthUser = require('../models/authUsers');

router.get('/register', function(req, res, next){
    AuthUser.find()
        .then(users => {
            res.status(200).send(users);
        }).catch(next);
})

router.post('/register', function(req, res, next){
    var user = req.body;
    AuthUser.create(user)
        .then(user => {
            console.log(user);
            res.status(200).send(user);
        })
        .catch(next)
})

module.exports = router;