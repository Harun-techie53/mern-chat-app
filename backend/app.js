const express = require('express');
const cors = require('cors');
const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());

app.use('/v1/user', require('./routes/userRoute'));
app.use('/v1/chat', require('./routes/chatRoute'));

//Undefined Routes Handler
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} in the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
