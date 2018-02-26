const mongoose = require('mongoose');

var schema = mongoose.Schema;

var PostSchema = new schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String
    }
})

var PostModel = mongoose.model('posts', PostSchema);
module.exports = PostModel;