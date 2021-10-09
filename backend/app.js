require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, logout, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const linkRegExp = require('./constants/linkRegExp');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(linkRegExp),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser);

app.post('/logout', logout);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);

app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { message, statusCode = 500 } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
