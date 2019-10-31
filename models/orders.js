const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = require('../models/carts')
const orderSchema = new Schema({
     product: { type: Array },
     total: { type: Number },
     user: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
          address: { type: String }
     }
})
module.exports = mongoose.model('order', orderSchema);