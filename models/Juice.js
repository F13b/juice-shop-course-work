const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JuiceShema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    }
}); 

const Juice = mongoose.model('Juice', JuiceShema);
module.exports = Juice;