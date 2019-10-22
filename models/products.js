const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  mrp: {
    type: Number,
    required: true,
    min: [1, "min value should be 1"],
    max: [100, "max value should be 100"]
    // validate: {
    //   validator: function(v) {
    //     return /\d{3/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid phone number!`
    // }
  },
  selling_price: { type: Number, required: true },
  description: { type: String, required: false },
  created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("product", productSchema);
