import React, { useRef } from 'react';
import { useChatState } from '../../context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ChatTopNavbar from '../../components/Chats/ChatTopNavbar';
import { Box, useDisclosure } from '@chakra-ui/react';
import SideDrawer from '../../components/Chats/SideDrawer';
import MyChats from '../../components/Chats/MyChats';
import Chatbox from '../../components/Chats/Chatbox';

const ChatPage = () => {
	const navigate = useNavigate();
	const { userDetails } = useChatState();
	const sideDrawerRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (!userDetails) navigate('/');
	}, [userDetails]);

	return (
		<Box w={'100%'}>
			<ChatTopNavbar sideDrawerRef={sideDrawerRef} onOpen={onOpen} />
			<Box display={'flex'} margin={'1rem'} h={'container.md'}>
				<MyChats />
				<Chatbox />
			</Box>
			<SideDrawer
				sideDrawerRef={sideDrawerRef}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Box>
	);
};

export default ChatPage;
