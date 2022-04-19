const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema({
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
        required: true
    }
}); 

const User = mongoose.model('User', UserShema);
module.exports = User;