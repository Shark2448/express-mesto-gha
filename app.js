const express = require('express');
const mongoose = require('mongoose');

const {
  login,
  createUser,
} = require('./controllers/users');

const handleErrors = require('./middlewares/handleErrors');
const router = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
