const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = require('../models/carts')
const orderSchema = new Schema({
    product: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        selling_price: { type: Number },
        mrp: { type: Number },
        price: { type: Number },
        quantity: { type: Number, require: true },
        total: { type: Number, require: true }
    }],
    total: { type: Number },
    user: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        address: { type: String },
    },
    payment_mode: { type: String },
    status: { type: String },
    create_at: { type: Date, required: true, default: Date.now }
})
module.exports = mongoose.model('order', orderSchema);