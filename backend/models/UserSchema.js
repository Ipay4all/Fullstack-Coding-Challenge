"use strict";

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.virtual("token").get(function () {
  let tokenObject = {
    userName: this.userName,
  };
  return jwt.sign(tokenObject, process.env.JWT_SECRET);
});

UserSchema.statics.authenticateToken = async function (token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return err;
    }
    return decoded;
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
