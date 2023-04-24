module.exports = (err, req, res, next) => {
  console.log(err)
  const { StatusCode = 500, message } = err;
  res.status(StatusCode)
    .send({
      message: StatusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  next();
};
