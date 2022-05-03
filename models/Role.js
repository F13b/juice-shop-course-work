const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleShema = new Schema({
    Name: {
        type: String,
        required: true,
        default: 'User', 
        unique: true
    }
}); 

const Role = mongoose.model('Role', RoleShema);
module.exports = Role;