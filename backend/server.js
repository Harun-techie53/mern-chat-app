const http = require('http');
require('dotenv').config();
const connectDB = require('./config/db');

//Caught the error due to uncaught promise rejection
process.on('uncaughtException', (err) => {
	console.log(err.name, err.message);
	process.exit(1);
});

const app = require('./app');

connectDB();

const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*'
	}
});

io.on('connection', (socket) => {
	console.log('socket', socket);

	console.log('Socket is active to be connected...');

	//receiving event from client
	socket.on('from-client', (payload) => {
		console.log('client payload', payload);

		io.emit('from-client', payload);
	});
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	process.exit(1);
});
