const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authHelper = require('../helpers/auth-helper');

// const db = mongoose.connection
const connection = mongoose.connection;
const connUri = process.env.MONGO_LOCAL_CONN_URL;
module.exports = {
  add: (req, res) => {
    let result = {};
    let status = 201;
    const data = req.body;
    const user = new User(data); // document = instance of a model
    console.log("user", user);
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
    const user = authHelper.getUserByToken(req);
    User.findById(user.user._id, function (error, result) {
      const data = {};
      data.status = result.status;
      // result.status = 200;
      data.data = result;
      res.send(data);
    });
  },
  update: (req, res) => {
    const userData = authHelper.getUserByToken(req);
    const user = new User(req.body);
    User.findByIdAndUpdate(userData.user._id, req.body).exec((err, result) => {
      if (!err && result) {
        res.send(result);
      } else {
        res.send(err);
      }
    })
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
              const token = jwt.sign({ user }, secret, options);
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
      } else {
        res.send(err);
      }
    });
  },
  upload: (req, res) => {
    console.log("request", req.files);
    res.send(req.file);
  },
  changePassword: async (req, res) => {
    const userData = authHelper.getUserByToken(req);
    const hash = await authHelper.generateBcryptPassword(req.body.password);
    User.findByIdAndUpdate(userData.user._id, { password: hash }).exec((err, result) => {
      if (!err && result) {
        res.send(result);
      } else {
        res.send(err);
      }
    })
  }
};