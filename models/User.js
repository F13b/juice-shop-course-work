const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        ref: 'Role'
    }
}); 

const User = mongoose.model('User', UserSchema);
module.exports = User;