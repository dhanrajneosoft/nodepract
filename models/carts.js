const mongoose = require('mongoose');
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    product: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            quantity: {
                type: Number
            },
            _id: false
        }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})
module.exports = mongoose.model('cart', cartSchema);