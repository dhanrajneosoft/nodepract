const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const db = mongoose.connection
const connection = mongoose.connection;
const connUri = process.env.MONGO_LOCAL_CONN_URL;
module.exports = {
  add: (req, res) => {
    let result = {};
    let status = 201;
    const data = req.body;
    const user = new User(data); // document = instance of a model
  //  user.save()
    // TODO: We can hash the password here before we insert instead of in the model
    user.save((err, user) => {
      if (!err) {
        console.log(user);
        result.status = status;
        // delete user.password;
        result.result = user;
      } else {
        status = 500;
        result.status = status;
        result.error = err;
      }
      res.status(status).send(result);
    });
  },
  get: (req, res) => {
    // res.send("get Called");
    mongoose.connect(
      "mongodb+srv://dhanraj:D8899@cluster0-abnij.mongodb.net/mydb?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        if (!err) {
          User.find(function (error, result) {
            const data = {};
            data.status = result.status;
            // result.status = 200;
            data.data = result;
            res.send(data);
          });
        } else {
          const result = {};
          result.status = 500;
          result.error = err;
          res.send(result);
        }
      }
    );
  },
  login: (req, res) => {
    const { username, password } = req.body;
    console.log({ mobile: username });
    User.findOne({ mobile: username }, (err, user) => {
      console.log(user);
      const result = {};
      if (user && !err) {
        bcrypt
          .compare(password, user.password)
          .then(match => {
            if (match) {
              console.log("Match", match);
              const secret = process.env.JWT_SECRET;
              const options = { expiresIn: "2d", issuer: "https://scotch.io" };
              const token = jwt.sign({ user: user.name }, secret, options);
              // console.log(token);
              result.token = token;
              // result.status = status;
              result.result = user;
            } else {
              result.status = 401;
              result.error = "Authentication Error";
            }
            res.send(result);
          })
          .catch(msg => {
            console.log("Error", msg);
          });
      }else{

      }
    });
  },
  upload: (req, res)=>{
    // console.log("request", req.body.);
    // res.send(req.files);
  }
};