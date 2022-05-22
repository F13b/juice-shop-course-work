const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JuiceSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Count: {
        type: Number,
        required: true
    }, 
    Images: {
        data: Buffer,
        contentType: String  
    }
}); 

const Juice = mongoose.model('Juice', JuiceSchema);
module.exports = Juice;