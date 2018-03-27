const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var Todos = require('../models/todos');


//GET request to /todos
router.get('/todos', function (req, res) {
  Todos.find()
        .then(todos => {
            res.status(200).send(todos)
            next()
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

//todo request to /todos
router.post('/todos', function (req, res, next) {
    var todos = (req.body);
  Todos.create(todos)
        .then(todo => {
            res.status(200).send(todo)
        })
        .catch(next)

});

//PUT request to /todos/:id
router.put('/todos/:id', function (req, res, next) {
  Todos.findByIdAndUpdate({ "_id": req.params.id }, req.body)
        .then(() => {
          Todos.findOne({ "_id": req.params.id })
                .then(todo => {
                    res.status(200).send(todo);
                })
                .catch(next)
        })
        .catch(next)
});

//DELETE request to /todos/:id
router.delete('/todos/:id', function (req, res, next) {
  Todos.findByIdAndRemove({ "_id": req.params.id })
        .then((todo) => {
            res.status(200).send(todo);
        })
        .catch(next)
});

module.exports = router;