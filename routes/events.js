const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Events = require('../models/events');

//GET request to /
router.get('/', function (req, res) {
    res.send(`<h1>Congratulations......</h1>`)
});

//GET request to /events
router.get('/events', function (req, res, next) {
    Events.find()
        .then(events => {
            res.status(200).send(events)
            next()
        })
        .catch(next)
});

//event request to /events
router.post('/events', function (req, res, next) {
    var events = (req.body);
    console.log(events)
    Events.create(events)
        .then(event => {
            console.log(event)
            res.status(200).send(event)
        })
        .catch(next)

});

//PUT request to /events/:id
router.put('/events/:id', function (req, res, next) {
    Events.findByIdAndUpdate({ "_id": req.params.id }, req.body)
        .then(() => {
            Events.findOne({ "_id": req.params.id })
                .then(event => {
                    res.status(200).send(event);
                })
                .catch(next)
        })
        .catch(next)
});

//DELETE request to /events/:id
router.delete('/events/:id', function (req, res, next) {
    Events.findByIdAndRemove({ "_id": req.params.id })
        .then((event) => {
            res.status(200).send(event);
        })
        .catch(next)
});

module.exports = router;