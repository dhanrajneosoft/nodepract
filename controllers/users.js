const mongoose = require("mongoose");
const User = require("../models/users");

const db = mongoose.connection;
console.log(db);

const connUri = process.env.MONGO_LOCAL_CONN_URL;
module.exports = {
  add: (req, res) => {
    let result = {};
    let status = 201;
    mongoose.connect(
      "mongodb+srv://dhanraj:D8899@cluster0-abnij.mongodb.net/mydb?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        if (!err) {
          const { name, password } = req.body;
          const user = new User({ name, password }); // document = instance of a model
          // TODO: We can hash the password here before we insert instead of in the model
          user.save((err, user) => {
            if (!err) {
              result.status = status;
              delete user.password;
              result.result = user;
              // delete result.result.password;
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          });
        } else {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      }
    );
  },
  get: (res, res) =>{
       
  }
};
