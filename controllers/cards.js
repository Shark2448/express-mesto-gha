const { notFoundError, badRequestError, serverError } = require('../errors/errors');
const Card = require('../models/card')

const createCard = (req, res, next) => {
  console.log(req.user.id);
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: _id
  })
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new badRequestError('Переданы некорректные данные'))
    } else {
      next(new serverError('Произошла ошибка на сервере'));
    }
  })
};

const getCards = (req, res, next) => {
  Card.find({})
  .then((cards) => {
    res.send(cards)
  })
  .catch((err) => {
    next(new serverError('Произошла ошибка на сервере'))
  })
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
  .orFail(() => {
    throw new notFoundError('Данная карточка не существует')
  })
  .then((card) => {
    res.send(card)
  })
  .catch((err) => {
    next(new serverError('Произошла ошибка на сервере'))
  })
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => {
    throw new notFoundError('Данная карточка не существует')
  })
  .then((card) => {
    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new badRequestError('Передан некорректный id карточки'))
    } else {
      next(new serverError('Произошла ошибка на сервере'));
    }
  })
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => {
    throw new notFoundError('Данная карточка не существует')
  })
  .then((card) => {
    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new badRequestError('Передан некорректный id карточки'))
    } else {
      next(new serverError('Произошла ошибка на сервере'));
    }
  })
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
}