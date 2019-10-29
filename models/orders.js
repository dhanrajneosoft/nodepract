const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
     name: String,
     product: [
          {
               id: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
               quantity: {
                    type: Number
               }
          }],
     user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
})
module.exports = mongoose.model('order', orderSchema);