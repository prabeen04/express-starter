const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Users = require('../models/users');

//GET request to /
router.get('/', function (req, res) {
    res.send(`<h1>Congratulations......</h1>`)
});

//GET request to /users
router.get('/users', function (req, res) {
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