import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import { Box, Button } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: 'chat',
			element: <ChatPage />,
		},
	]);
	return (
		<Box
			backgroundImage={'url(./images/background.jpg)'}
			objectFit={'cover'}
			minH={'100vh'}
		>
			<RouterProvider router={router} />
		</Box>
	);
}

export default App;
