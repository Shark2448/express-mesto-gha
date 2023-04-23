const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../reg/reg');

const {
  getUsers,
  getUser,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.get('/me', getUserInfo);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(reg),
  }),
}), updateUserAvatar);

module.exports = userRouter;
