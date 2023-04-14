const cardRouter = require('express').Router();
const { createCard, getCards, deleteCard, dislikeCard, likeCard } = require('../controllers/cards');


cardRouter.delete('/:cardId', deleteCard);
cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;