"use strict";

const User = require("../models/UserSchema");

const basicAuth = async (req, res, next) => {
  try {
    const userName = await User.findOne({ userName: req.body.userName });
    if (userName) {
      return res.status(403).send("Username already exists");
    }

    next();
  } catch (e) {
    next("Invalid Login");
  }
};

module.exports = basicAuth;
