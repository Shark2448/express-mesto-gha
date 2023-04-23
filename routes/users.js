const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { reg } = require('../reg/reg');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', auth, getUsers);
userRouter.get('/:userId', auth, getUser);
userRouter.get('/me', auth, getUserInfo);
userRouter.patch('/me', auth, updateUserProfile);
userRouter.patch('/me/avatar', auth, celebrate({
  avatar: Joi.string().regex(reg),
}), updateUserAvatar);

module.exports = userRouter;
