const express = require('express');
const router = express.Router();

var Users = require('../models/users');


//GET request to /users
router.get('/users', function(req, res){
    Users.find()
    .then(users => {
        res.send(200, users)
        next()
    })
    .catch(err => {
        res.send(500, err)
    })
});

//POST request to /users
router.post('/users', function(req, res){
    res.send('this is a POST request');
});

//PUT request to /users/:id
router.put('/users/:id', function(req, res){
    res.send('this is a PUT request');
});

//DELETE request to /users/:id
router.delete('/users/:id', function(req, res){
    res.send('this is a DELETE request');
});

module.exports = router;