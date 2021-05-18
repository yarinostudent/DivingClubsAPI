const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {
    config
} = require('../config/jwt_secret')

const schemaUser = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

exports.UserModel = mongoose.model('users', schemaUser);

exports.validLogin = (_bodyData) => {
    let schemaJoi = Joi.object({
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(2).max(30).required(),
    })
    return schemaJoi.validate(_bodyData);
}

exports.genToken = (user_id) => {
    let token = jwt.sign({_id: user_id}, config.jwt_secret, {expiresIn: "60mins"});
    return token;
}

exports.validData = (_bodyData) => {
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(2).max(30).required(),
    })
    return schemaJoi.validate(_bodyData);
}