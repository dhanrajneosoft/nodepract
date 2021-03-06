const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: {
    type: Number,
    required: true,
    min: [1, "min value should be 1"],
    max: [1000000, "max value should be 1000000"]
  },
  selling_price: { type: Number, required: true },
  images: [{ url: { type: String } }],
  description: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
  max_order_limit: { type: Number }
});
module.exports = mongoose.model("product", productSchema);