const Cart = require('../models/carts');
const User = require('../models/users')
const authHelper = require('../helpers/auth-helper');
module.exports = {
    add: async (req, res) => {
        const reqBody = req.body;
        const user = authHelper.getUserByToken(req);
        reqBody.user = user.user._id;
        console.log("user", reqBody);
        const cart = await new Cart(reqBody);
        Cart.find({ user: reqBody.user }).exec((err, result) => {
            if (!result.length) {
                cart.save().then((result) => {
                    res.send(result);
                }).catch((error) => {
                    res.send(error.errmsg);
                })
            } else {
                Cart.findOne({ user: reqBody.user, 'product.id': reqBody.product.id }).exec(async (err, result) => {
                    console.log('result of product ', result);
                    if (!err) {
                        if (result) {
                            res.send(result);
                        } else {
                            const cartUpdate = await new Cart(reqBody);
                            Cart.updateOne({ user: reqBody.user }, { $push: { product: cartUpdate.product } }).exec((err, result) => {
                                if (!err && result) {
                                    res.send(result);
                                } else {
                                    res.result(err);
                                }
                            })
                        }
                    } else {
                        res.send(err);
                    }
                })
            }
        })
    },
    getAll: (req, res) => {
        console.log("fdfd");
        const user = authHelper.getUserByToken(req);
        console.log(user);
        Cart.find().populate({ path: 'user' }).populate({ path: 'product.id' }).exec((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    },
    get: (req, res) => {
        const userData = authHelper.getUserByToken(req);
        console.log(userData);
        Cart.find({ user: userData.user._id }).populate([{ path: 'user' }, { path: 'product.id' }]).exec((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    },
    updateQuantity: (req, res) => {
        const item_id = req.params.item_id;
        Cart.findOneAndUpdate({ 'product._id': item_id }, { $set: { 'product.$.quantity': req.body.quantity } }).exec((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    },
    removeItemFromCart: (req, res) => {
        const item_id = req.params.item_id;
        Cart.findOneAndUpdate({ 'product._id': item_id }, { $pull: { "product": { _id: item_id } } }).exec((err, result) => {
            if (!err && result) {
                res.send(result)
            } else {
                res.send(err);
            }
        })
    }
}