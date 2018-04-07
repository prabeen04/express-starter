const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Users = require('../models/users');

//GET request to /users
router.get('/users', function (req, res, next) {
    Users.find()
        .then(function(users){
            res.send(users)
            next
        })
        .catch(next)
});
//GET request to /users/:id
router.get('/users/:id', function (req, res, next) {
    Users.findOne({ "_id": req.params.id })
        .then(user => {
            res.status(200).send(user);
        })
        .catch(next)
});
//POST request to /users
router.post('/users', function (req, res, next) {   
    var users = (req.body);
    Users.create(users)
        .then(user => {
            res.status(200).send(user)
        })
        .catch(next)

});

//PUT request to /users/:id
router.put('/users/:id', function (req, res, next) {
    Users.findByIdAndUpdate({ "_id": req.params.id }, req.body)
        .then(() => {
            Users.findOne({ "_id": req.params.id })
                .then(user => {
                    res.status(200).send(user);
                })
                .catch(next)
        })
        .catch(next)
});

//DELETE request to /users/:id
router.delete('/users/:id', function (req, res, next) {
    Users.findByIdAndRemove({ "_id": req.params.id })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch(next)
});

module.exports = router;