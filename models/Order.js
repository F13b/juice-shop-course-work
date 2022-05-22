const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }, 
    Purchases: [ {
        Product: {
            type: String,
            required: true,
            ref: 'Juice'
        },
        Count: {
            type: Number,
            required: true,
            default: 1
        }
    } ]
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;