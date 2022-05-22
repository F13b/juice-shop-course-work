const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    User: {
        type: String,
        required: true
    }, 
    Purchases: [ {
        productID: {
            type: String, 
            required: true,
            ref: 'Juice'
        },
        productName: {
            type: String,
            required: true,
        }, 
        productPrice: {
            type: Number,
            required: true,
        },
        productCount: {
            type: Number,
            required: true,
            default: 1
        }
    } ]
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;