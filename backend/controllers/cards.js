const Card = require('../models/card');

const { successCode200 } = require('../utils/constants');
const Err400 = require('../errors/Err400');
const Err403 = require('../errors/Err403');
const Err404 = require('../errors/Err404');

module.exports.getCards = (req, res, next) => {
    Card.find({})
        .then((cards) => res.status(successCode200).send(cards))
        .catch((next));
};

module.exports.createCard = (req, res, next) => {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
        .then((card) => res.status(successCode200).send(card))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new Err400('New card information was filled incorrectly'));
            } else { next(err); }
        });
};

module.exports.deleteCard = (req, res, next) => {
    Card.findById(req.params.cardId)
        .orFail(new Err404('Card not found'))
        .then((card) => {
            if (!card.owner.equals(req.user._id)) {
                return next(new Err403('Not authorized to delete cards of other users'));
            } return card.remove()
                .then(() => res.send({ message: 'Card was successfully deleted' }));
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                next(new Err400('Incorrect card id'));
            } else { next(err); }
        });
};

module.exports.likeCard = (req, res, next) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
    )
        .orFail(new Err404('Card not found'))
        .then((card) => res.status(successCode200).send(card))
        .catch((err) => {
            if (err.name === 'CastError') {
                next(new Err400('Card like information was sent incorrectly'));
            } else { next(err); }
        });
};

module.exports.dislikeCard = (req, res, next) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
        .orFail(new Err404('Card not found'))
        .then((card) => res.status(successCode200).send(card))
        .catch((err) => {
            if (err.name === 'CastError') {
                next(new Err400('Card dislike information was sent incorrectly'));
            } else { next(err); }
        });
};
