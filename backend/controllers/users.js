const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { successCode200 } = require('../utils/constants');
const Err400 = require('../errors/Err400');
const Err404 = require('../errors/Err404');
const Err409 = require('../errors/Err409');

module.exports.getAllUsers = (req, res, next) => {
    User.find({})
        .then((users) => res.status(successCode200).send(users))
        .catch((next));
};

module.exports.getUserById = (req, res, next) => {
    User.findById(req.params.userId)
        .orFail(new Err404('User not found'))
        .then((user) => {
            res.status(successCode200).send(user);
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                next(new Err400('Incorrect id'));
            } else { next(err); }
        });
};

module.exports.createUser = (req, res, next) => {
    const { name, about, avatar, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => User.create({ name, about, avatar, email, password: hash })
            .then(() => res.status(successCode200).send({ name, about, avatar, email }))
            .catch((err) => {
                if (err.name === 'ValidationError') {
                    next(new Err400('Information about the new user was filled incorrectly'));
                } if (err.code === 11000) {
                    next(new Err409('Email already exists'));
                } else { next(err); }
            }));
};

module.exports.updateUser = (req, res, next) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
        .orFail(new Err404('User not found'))
        .then((user) => res.status(successCode200).send(user))
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new Err400('Information about the user was filled incorrectly'));
            } else { next(err); }
        });
};

module.exports.updateAvatar = (req, res, next) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
        .orFail(new Err404('User not found'))
        .then((user) => res.status(successCode200).send(user))
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                next(new Err400('Avatar link was filled incorrectly'));
            } else { next(err); }
        });
};

module.exports.userProfile = (req, res, next) => {
    User.findById(req.user._id)
        .orFail(new Err404('User not found'))
        .then((user) => {
            res.status(successCode200).send(user);
        })
        .catch((next));
};
