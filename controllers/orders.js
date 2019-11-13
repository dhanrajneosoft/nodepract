// const mongoose = require('')
const Orders = require('../models/orders');
const mongoose = require('mongoose');
const controller = require('../controllers/carts');
const authHelper = require('../helpers/auth-helper');
const Cart = require('../models/carts');
module.exports = {
    add: (req, res) => {
        const orders = new Orders(req.body);
        // console.log("cart list", controller.get(req, res));
        const order = {
            user: { address: req.body.address },
            payment_mode: req.body.payment_mode,
            status: "Pending",
            total: 0,
        }
        const userData = authHelper.getUserByToken(req)
        Cart.findOne({ user: userData.user._id }).exec((err, result) => {
            if (!err && result) {
                order.product = result.product;
                result.product.forEach(product => { order.total += product.total });
                order.user.id = userData.user._id;
                // console.log("order data", order);
                const orders = new Orders(order);
                orders.save().then((data) => {
                    console.log("user data", { user: userData.user._id });
                    Cart.findOneAndDelete({ user: userData.user._id }).exec((err, newdata) => {
                        if (!err && newdata) {
                            res.send(newdata);
                        } else {
                            res.send(err);
                        }
                    });
                }).catch((error) => {
                    res.send(error);
                })
            } else {
                console.log("error", err)
            }
        })
        // orders.save((err, result) => {
        //     if (!err && result) {
        //         res.send(result);
        //     } else {
        //         res.send(err);
        //     }
        // })
        // console.log(orders);
    },
    get: (req, res) => {
        Orders.find().populate({ path: 'product.id' }).exec((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    },
    updateStatus: (req, res) => {
        const params = req.params;
        const body = req.body;
        Orders.findByIdAndUpdate(params.order_id, { $set: { status: body.action } }).exec((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    }
}