const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    Name: {
        type: String,
        required: true,
        default: 'User', 
        unique: true
    }
}); 

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;