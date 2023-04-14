const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFoundError = 404;

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('/', (req, res, next) => {
  next(res.status(NotFoundError).send({ message: 'Данная страница не найдена' }));
});

module.exports = router;
