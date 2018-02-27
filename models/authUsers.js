var mongoose = require('mongoose');

var schema = mongoose.Schema;
var AuthUserSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }

})

var AuthUserModel = mongoose.model('authUser', AuthUserSchema);
module.exports = AuthUserModel;