const express = require('express');
const router = express.Router();

var Users = require('../models/users');

//GET request to /
router.get('/', function(req, res){
    res.send(`<h1>Congratulations......</h1>`)
});

//GET request to /users
router.get('/users', function(req, res){
    Users.find()
    .then(users => {
        res.status(200).send(users)
        next()
    })
    .catch(err => {
        res.status(500).send(err)
    })
});

//POST request to /users
router.post('/users', function(req, res){
    users = req.body;
    Users.create(users, function(err, user){
        if(err){
            console.log(err);
            throw err;
        }
        res.send(user);
    })
    
});

//PUT request to /users/:id
router.put('/users/:id', function(req, res){
    res.send('this is a PUT request');
});

//DELETE request to /users/:id
router.delete('/users/:id', function(req, res){
    res.send('this is a DELETE request');
});

//GET request to /users
router.get('/posts', function(req, res){
    Posts.find()
    .then(posts => {
         res.status(200).send(posts)
        next()
    })
    .catch(err => {
        res.status(500).send(err)
    })
});

//POST request to /users
router.post('/posts', function(req, res){
    res.send('this is a POST request');
});

//PUT request to /posts/:id
router.put('/posts/:id', function(req, res){
    res.send('this is a PUT request');
});

//DELETE request to /posts/:id
router.delete('/posts/:id', function(req, res){
    res.send('this is a DELETE request');
});


module.exports = router;