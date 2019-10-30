const Cart = require('../models/carts');
const User = require('../models/users')
const authHelper = require('../helpers/auth-helper');
module.exports = {
    add:async (req, res) => {
        const cart = await new Cart(req.body);
        console.log('cart', cart);
        cart.save().then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error.errmsg);
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
        Cart.find({user: userData.user._id}).populate([{path: 'user'}, {path: 'product.id'}]).exec((err, result)=>{
             if(!err && result){
                 res.send(result);
             }else {
                 res.send(err);
             }
        })
    }
}