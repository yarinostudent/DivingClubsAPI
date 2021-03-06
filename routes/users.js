const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {
    auth
} = require('../middlewares/auth');
const {
    pick
} = require('lodash');
const {
    UserModel,
    genToken,
    validData,
    validLogin,
} = require('../models/usersModel');

//--------Users--------

router.get('/', (req, res) => {
    res.json({
        msg: "users work"
    })
})

router.get('/userInfo', auth, async (req, res) => {
    try {
        let data = await UserModel.findOne({
            _id: req.tokenData._id
        }, {
            password: 0
        })
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.post('/login', async (req, res) => {
    let validUser = validLogin(req.body);
    if (validUser.error) {
        return res.status(400).json(validUser.error[0].message);
    }
    try {
        let user = await UserModel.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(400).json({
                msg: "User Not Exist"
            });
        }
        let validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).json({
                msg: "Invalid Password"
            });
        }
        let newToken = genToken(user._id);
        res.json({
            token: newToken
        })
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

router.post('/signup', async (req, res) => {
    let validUser = validData(req.body);
    if (validUser.error) {
        return res.status(400).json(validUser.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        res.status(201).json(pick(user, ["_id", "name", "email", "createdAt"]));
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;