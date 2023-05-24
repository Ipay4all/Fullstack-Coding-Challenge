'use strict';

const UserModel = require('../models/UserSchema');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
        }

        const user = new UserModel(data);
        const record = await user.save();
        res.status(200).json(record);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const basicHeader = req.headers.authorization.split(' ');
        const encodedString = basicHeader.pop();
        const decodedString = base64.decode(encodedString);
        const [userName, password] = decodedString.split(':');

        const user = await UserModel.findOne({ userName: userName });
        
        if(user) {
            const valid = await bcrypt.compare(password, user.password);
            if(valid) {
                const token = user.token;
                res.status(200).json({ token });
            } else {
                next('Invalid Login');
            }
        } else {
            next('Invalid Login');
        }
    } catch (err) {
        next(err);
    }
};


const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};


module.exports = { signup, login, getAllUsers };