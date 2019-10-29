const Cart = require('../models/carts');
module.exports = {
    add: (req, res) => {
        console.log(req.body);
        const cart = new Cart(req.body);
        // if()         
        cart.save().then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        })
        //  res.send(cart);
    },
    get: (req, res) => {
        console.log("fdfd");
       Cart.find().populate({path: 'product.id'}).exec((err, result)=>{
           if(!err && result){
               res.send(result);
           }else {
               res.send(err);
           }
       })
    }
}