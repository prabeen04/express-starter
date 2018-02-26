var mongoose = require('mongoose');

var schema = mongoose.Schema;

var UsersSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    location: {
        type: String
    },
    hobbies: {
        type: [String]
    }    
})

var UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel;