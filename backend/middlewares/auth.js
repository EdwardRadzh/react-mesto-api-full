const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // const token = req.cookies.jwt;
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET === 'dev-secret');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
