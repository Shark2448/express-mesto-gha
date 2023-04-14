const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');
const handleErrors = require('./errors/handleErrors');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = { _id: '643918364fb953c27a5225bc' };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
