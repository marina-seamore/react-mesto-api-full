// app
const express = require('express');
require('dotenv').config();

console.log(process.env.NODE_ENV);
const { port = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const Err404 = require('./errors/Err404');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.use(cors({
    origin: [
        'http://mesto.dom.nomoredomains.rocks',
        'https://mesto.dom.nomoredomains.rocks',
        'http://api.mesto.dom.nomoredomains.rocks',
        'https://mesto.dom.nomoredomains.rocks',
        'http://localhost:3000',
    ],
    credentials: true,
    methods: 'GET, PUT, PATCH, POST, DELETE',
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
}), login);
app.post('/signup', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().regex(/https?:\/\/(w{3}.)?[\w-]+\.\S+[^><]/),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
}), createUser);

// routes requiring authorization:
app.use(auth);
app.use('/users', userRoute);
app.use('/cards', cardRoute);

app.use('*', (req, res, next) => {
    next(new Err404('Page not found'));
});

// errors
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({ message: statusCode === 500 ? err.message : message });
    next();
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
