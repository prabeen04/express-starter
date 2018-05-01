const mongoose = require('mongoose');

var schema = mongoose.Schema;

var EventSchema = new schema({
    title: {
        type: String
    },
    user: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    description: {
        type: String
    }
})

var EventModel = mongoose.model('events', EventSchema);
module.exports = EventModel;