"use strict";

const UserModel = require("../models/UserSchema");

const bearerAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next("You are not Authorized");
    }

    const token = req.headers.authorization.split(" ").pop();
    try {
      const validUser = await UserModel.authenticateToken(token);
      const userInfo = await UserModel.findOne({ userName: validUser.userName });
      if (userInfo) {
        req.user = userInfo;
        req.token = userInfo.token;
        next();
      } else {
        next("Invalid Login");
      }
    } catch (e) {
      res.status(403).send("Invalid Login");
    }
  } catch (e) {
    next("Invalid Login");
  }
};

module.exports = bearerAuth;
