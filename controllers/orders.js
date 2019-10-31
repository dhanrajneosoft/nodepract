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
            user: { address: req.body.address},
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
                orders.save().then((result) => {
                    res.send(result);
                }).catch((error) => {
                    res.send(error.errmsg);
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
        Orders.find().populate({ path: 'product' }).exec((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    }

}