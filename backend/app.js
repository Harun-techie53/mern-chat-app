const express = require('express');
const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(express.json());

app.use('/v1/user', require('./routes/userRoute'));

//Undefined Routes Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;