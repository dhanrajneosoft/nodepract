// const mongoose = require('')
const Orders = require('../models/orders');
const mongoose = require('mongoose');
module.exports = {
    add: (req, res) => {
       const orders = new Orders(req.body);
     orders.save((err, result)=>{
         if(!err && result){
             res.send(result);
         }else {
             res.send(err);
         }
     })
       console.log(orders);
    },
    get: (req, res)=>{
        Orders.find().populate({ path: 'product' }).exec((err, result)=>{
            if(!err && result){
                res.send(result);
            }else {
                res.send(err);
            }
        })
    }
    
}