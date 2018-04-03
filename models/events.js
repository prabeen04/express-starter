const mongoose = require('mongoose');

var schema = mongoose.Schema;

var EventSchema = new schema({
    title: {
        type: String
    },
    user: {
        type: String
    },
    eventStart: {
        type: Date,
    },
    eventEnd: {
        type: Date,
    },
    description: {
        type: String
    }
})

var EventModel = mongoose.model('events', EventSchema);
module.exports = EventModel;