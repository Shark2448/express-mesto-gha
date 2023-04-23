const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../reg/reg');
const auth = require('../middlewares/auth');
const {
  createCard,
  getCards,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

cardRouter.post('/', auth, celebrate({
  link: Joi.string().required().regex(reg),
}), createCard);
cardRouter.get('/', auth, getCards);
cardRouter.delete('/:cardId', auth, deleteCard);
cardRouter.put('/:cardId/likes', auth, likeCard);
cardRouter.delete('/:cardId/likes', auth, dislikeCard);

module.exports = cardRouter;
