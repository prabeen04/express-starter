var mongoose = require('mongoose');

var schema = mongoose.Schema;

var UsersSchema = new schema({
    username: String,
    email: String,
    password: String
})

var UsersModel = mongoose.model('usersmodel', UsersSchema);
module.exports = UsersModel;