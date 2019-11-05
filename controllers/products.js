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
      {
        $lookup:
          { from: 'products', localField: 'id', foreignField: 'product', as: 'orders' }
      }])
      .exec().then(function (data) {
        res.send(data)
        console.log(data)
      }).catch(function (err) {
        console.log(err)
      })
  },
  getMatchAgg: (req, res) => {
    Product.aggregate([{
      $match: { 'price': { $in: [9] } }
    }]).exec().then((data) => {
      res.send(data);
    }).catch((error) => {
      res.send(error);
    })
  },
  uploadProductImage: (req, res) => {
    console.log(req.body);
    var product = new Product({ images: { url: req.file.filename } });
    delete product._id;
    console.log('product image', product);

    Product.updateOne({ _id: req.body.product_id }, { $push: { images: [{ url: req.file.filename }] } }).exec((err, result) => {
      if (!err && result) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  },
  deleteProductImageByImageId: (req, res) => {
      Product.findByIdAndUpdate({_id : req.body.product_id}, {$pull : { images : {_id : req.params.id}}}).exec((err, result)=>{
           if(!err && result){
             res.send(result);
           }else {
             res.send(err);
           }
      }) 
  }
};
