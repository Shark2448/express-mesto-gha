const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../reg/reg');

const {
  createCard,
  getCards,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(reg),
  }),
}), createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;
