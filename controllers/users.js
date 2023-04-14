const User = require('../models/user');

const BadRequestError = 400;
const NotFoundError = 404;
const InternalServerError = 500;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw res.status(NotFoundError).send({ message: 'Данного пользователя не существует' });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(BadRequestError).send({ message: 'Передан некорректный id' }));
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(BadRequestError).send({ message: 'Переданы некорректные данные' }));
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(BadRequestError).send({ message: 'Переданы некорректные данные' }));
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(BadRequestError).send({ message: 'Переданы некорректные данные' }));
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
};
