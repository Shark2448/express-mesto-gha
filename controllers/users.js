const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    next(res.status(500).send({ message: 'Произошла ошибка на сервере' }))
  })
}

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
  .orFail(() => {
    throw res.status(404).send({ message: 'Данного пользователя не существует' });
  })
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    console.log(err.name)
    if (err.name === 'CastError') {
      next(res.status(400).send({ message: 'Передан некорректный id' }));
    } else {
      next(res.status(500).send({ message: 'Произошла ошибка на сервере' }))
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
    if (err.name === 'ValidationError') {
      next(res.status(400).send({ message: 'Переданы некорректные данные' }));
    } else {
      next(res.status(500).send({ message: 'Произошла ошибка на сервере' }))
    }
  })
}

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(res.status(400).send({ message: 'Переданы некорректные данные' }));
    } else {
      next(res.status(500).send({ message: 'Произошла ошибка на сервере' }))
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
    if (err.name === 'ValidationError') {
      next(res.status(400).send({ message: 'Переданы некорректные данные' }));
    } else {
      next(res.status(500).send({ message: 'Произошла ошибка на сервере' }))
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