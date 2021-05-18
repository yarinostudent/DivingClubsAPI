const jwt = require('jsonwebtoken');
const {
    config
} = require('../config/jwt_secret')

exports.auth = (req, res, next) => {
    let token = req.header("x-auth-token");
    if (!token) {
        return res.json({
            msg: "You Must Send Token"
        });
    }
    try {
        req.tokenData = jwt.verify(token, config.jwt_secret);
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Invalid Token Or Expired"
        });
    }
}