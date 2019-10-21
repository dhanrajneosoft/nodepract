require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
// app.use("/user", user);
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const environment = process.env.NODE_ENV;
const stage = require("./config")[environment];

const server = app.listen(stage.port, function() {});
const Schema = mongoose.Schema;
const routes = require("./routes/index.js");
mongoose.connect(
  `mongodb+srv:${process.env.MONGO_DB_NAME}:${process.env.MONGO_DB_PASS}//:@cluster0-abnij.mongodb.net/mydb?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.get("/get", function(req, res) {
  console.log(req);
  MyModel.find(function(error, result) {
    console.log(result);
    console.log(error);
    res.send(result);
  });
});
const Customer = mongoose.Schema({
  name: String,
  address: String,
  email: String
});
const customerModel = mongoose.model("customer", Customer);
app.use(express.json());
app.post("/addcustomer", function(req, res) {
  console.log(req.body);
  const customer = new customerModel(req.body);
  console.log(
    customer.collection.insert(req.body, function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    })
  );
  res.send(req.body);
});

app.use("/api/v1", routes(router));
module.exports = app;
