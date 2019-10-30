const Product = require("../models/products");
const mongoose = require("mongoose");
module.exports = {
  add: (req, res) => {
    const result = {};
    const product = new Product(req.body);
    console.log(product);
    product.save((err, product) => {
      console.log(product);
      console.log(err);
      if (!err && product) {
        result.data = product;
        res.send(result);
      } else {
        result.status = 501;
        result.error = err;
        res.send(result);
      }
    });
  },
  get: (req, res) => {
    Product.find(function (err, product) {
      const result = {};
      if (!err && product) {
        result.data = product;
        res.send(result);
      } else {
        result.errors = err;
        res.send(result);
      }
    });
  },
  delete: (req, res) => {
    // console.log(req.params);
    const id = req.params.id;
    Product.deleteOne({ _id: id }).then(
      result => {
        if (result) {
          res.send(result);
        } else {
          res.send("Record not Found");
        }
      },
      error => {
        res.send("Record not Found");
      }
    );
  },
  update: (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const data = req.body;
    const product = new Product(req.body);
    console.log(product);
    Product.updateOne({ _id: id }, req.body, { runValidators: true }).then(
      result => {
        res.send(result);
      },
      error => {
        res.send(error);
      }
    );
  },
  getProductDatails: (req, res) => {
    Product.aggregate([
      { $lookup : 
        { from: 'products', localField: 'id', foreignField: 'product', as: 'orders' }}])
        .exec().then(function(data){
          res.send(data)
          console.log(data)
          }).catch(function(err){
          console.log(err)
          })
  },
  getMatchAgg: (req, res)=>{
    Product.aggregate([{
       $match: {'price' : {$in : [9]}}
    }]).exec().then((data)=>{
      res.send(data);
    }).catch((error)=>{
      res.send(error);
    })
  }
};
