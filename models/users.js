const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const environment = process.env.NODE_ENV;
const stage = require("../config")[environment];
// schema maps to a collection
const Schema = mongoose.Schema;
const addressSchema = new Schema({add: String});
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  role:{
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    trim : true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  address: [addressSchema],
}, {
  toObject: {
    transform: function (doc, ret) {
      // delete ret._id;
      delete ret.password
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      // delete ret._id;
      delete ret.password
    }
  }
});
userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        // console.log("Error hashing password for user", user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});
module.exports = mongoose.model("users", userSchema);
