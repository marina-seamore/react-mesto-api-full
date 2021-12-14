const jwt = require('jsonwebtoken');
const Err401 = require('../errors/Err401');

module.exports.auth = (req, res, next) => {
    const token = req.cookies.jwt;
    let payload;
    try {
        payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
        throw new Err401('Authorization required');
    }

    req.user = payload;
    next();
};
