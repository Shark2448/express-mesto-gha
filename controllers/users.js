const { notFoundError, badRequestError, serverError } = require('../errors/errors');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    next(new serverError('Произошла ошибка на сервере'))
  })
}

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
  .orFail(() => {
    throw new notFoundError('Данного пользователя не существует')
  })
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'badRequestError') {
      next(new badRequestError('Передан некорректный id'));
    } else {
      next(new serverError('Произошла ошибка на сервере'))
    }
  })
}

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((newUser) => {
    res.send(newUser);
  })
  .catch((err) => {
    if (err.name === 'badRequestError') {
      next(new badRequestError('Переданы некорректные данные'));
    } else {
      next(new serverError('Произошла ошибка на сервере'))
    }
  })
}

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'badRequestError') {
      next(new badRequestError('Переданы некорректные данные'));
    } else {
      next(new serverError('Произошла ошибка на сервере'))
    }
  })
}

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'badRequestError') {
      next(new badRequestError('Переданы некорректные данные'));
    } else {
      next(new serverError('Произошла ошибка на сервере'))
    }
  })
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar
}