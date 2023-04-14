const userRouter = require('express').Router();
const { createUser, getUsers, getUser, updateUserProfile, updateUserAvatar } = require('../controllers/users');


userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;