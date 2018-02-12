var mongoose = require('mongoose');

var schema = mongoose.Schema;

var UsersSchema = new schema({
    name: String,
    email: String
})

var UsersModel = mongoose.model('users', UsersSchema);
module.exports = UsersModel;