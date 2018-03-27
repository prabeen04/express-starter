const mongoose = require('mongoose');

var schema = mongoose.Schema;

var TodoSchema = new schema({
    title: {
        type: String
    },
    priority: {
        type: String
    },
    creator: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean
    }
})

var TodoModel = mongoose.model('todos', TodoSchema);
module.exports = TodoModel;