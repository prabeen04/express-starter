const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Posts = require('../models/posts');

//GET request to /
router.get('/', function (req, res) {
    res.send(`<h1>Congratulations......</h1>`)
});

//GET request to /posts
router.get('/posts', function (req, res) {
    Posts.find()
        .then(posts => {
            res.status(200).send(posts)
            next()
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

//GET request to /posts/:id
router.get('/posts/:id', function (req, res, next) {
            Posts.findOne({ "_id": req.params.id })
                .then(post => {
                    res.status(200).send(post);
                })
                .catch(next)
});

//POST request to /posts
router.post('/posts', function (req, res, next) {
    var posts = (req.body);
    Posts.create(posts)
        .then(post => {
            res.status(200).send(post)
        })
        .catch(next)

});

//PUT request to /posts/:id
router.put('/posts/:id', function (req, res, next) {
    Posts.findByIdAndUpdate({ "_id": req.params.id }, req.body)
        .then(() => {
            Posts.findOne({ "_id": req.params.id })
                .then(post => {
                    res.status(200).send(post);
                })
                .catch(next)
        })
        .catch(next)
});

//DELETE request to /posts/:id
router.delete('/posts/:id', function (req, res, next) {
    Posts.findByIdAndRemove({ "_id": req.params.id })
        .then((post) => {
            res.status(200).send(post);
        })
        .catch(next)
});

module.exports = router;