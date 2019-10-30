const Cart = require('../models/carts');
const User = require('../models/users')
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
        Cart.find().populate({ path: 'user' }).populate({ path: 'product.id' }).exec((err, result) => {
            if (!err && result) {
                res.send(result);
            } else {
                res.send(err);
            }
        })
    },
    get: (req, res) => {
        Cart.find({user: '5db7eb9693da762dbed2885d'}).populate([{path: 'user'}, {path: 'product.id'}]).exec((err, result)=>{
             if(!err && result){
                 res.send(result);
             }else {
                 res.send(err);
             }
        })
    }
}