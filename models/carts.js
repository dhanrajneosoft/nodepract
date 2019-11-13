
const mongoose = require('mongoose');
const product = require('../models/products');
// const mongoose = require('mongoose');
// const cartProductSchema = new Schema
const Schema = mongoose.Schema;
const bson = require('bson');
const cartSchema = new Schema({
    product: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            selling_price: { type: Number },
            mrp: { type: Number },
            price: { type: Number },
            quantity: { type: Number, require: true },
            total: { type: Number, require: true }
        }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', unique: true }
}).pre('save', function (next) {
    const prod = this;
    const prodID = prod.product.map((value, index, arr) => {
        return value.id;
    });
    const productsData = product.find({ _id: { $in: prodID } }).exec(async (err, result) => {
        if (!err && result) {
            await prod.product.forEach(async (element) => {
                const record = await result.find((async (data) => {
                    if (data._id == element.id) {
                        return await true;
                    }
                }));
                element.price = record.price;
                element.selling_price = record.selling_price;
                element.mrp = record.mrp;
                element.total = record.selling_price * element.quantity;
            });
            next();
            //  next();
        } else {
            console.log(err);
            //  next(err);
        }
    })
}).pre('updateOne', function (next) {
    const prod = this.getUpdate();
    const prd = Object.values(prod);
    console.log("prod ...........", prod.$push);
    const prodID = prod.$push.product.map((value, index, arr) => {
        console.log(value);
        return value.id;
    });
    const productsData = product.find({ _id: { $in: prodID } }).exec(async (err, result) => {
        if (!err && result) {
            await prod.$push.product.forEach(async (element) => {

                const record = await result.find((async (data) => {
                    if (data._id == element.id) {
                        return await true;
                    }
                }));
                element.price = record.price;
                element.selling_price = record.selling_price;
                element.mrp = record.mrp;
                element.total = record.selling_price * record.quantity;
            });
            next();
            //  next();
        } else {
            res.send(err);
        }
    })

});

module.exports = cart = mongoose.model('cart', cartSchema);