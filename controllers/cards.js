const Card = require('../models/card');

const BadRequestError = 400;
const NotFoundError = 404;
const InternalServerError = 500;

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(BadRequestError).send({ message: 'Переданы некорректные данные' }));
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw (res.status(NotFoundError).send({ message: 'Данная карточка не существует' }));
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          res.status(BadRequestError).send({ message: 'Передан некорректный id карточки' }),
        );
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw (res.status(NotFoundError).send({ message: 'Данная карточка не существует' }));
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          res.status(BadRequestError).send({ message: 'Передан некорректный id карточки' }),
        );
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw (res.status(NotFoundError).send({ message: 'Данная карточка не существует' }));
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          res.status(BadRequestError).send({ message: 'Передан некорректный id карточки' }),
        );
      } else {
        next(res.status(InternalServerError).send({ message: 'На сервере произошла ошибка' }));
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
