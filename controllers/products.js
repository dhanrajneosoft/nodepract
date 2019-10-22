const Product = require("../models/products");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://dhanraj:D8899@cluster0-abnij.mongodb.net/mydb?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
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
    Product.find(function(err, product) {
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
  }
};
