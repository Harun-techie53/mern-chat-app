import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Text, VStack, useDisclosure } from '@chakra-ui/react';

import React from 'react';
import ChatPreview from './ChatPreview';
import CreateChatModal from './CreateChatModal';

const MyChats = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box w={'40%'} bg={'white'} borderRadius={'0.5rem'} padding={'1rem'}>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Text fontSize={'xl'}>My Chats</Text>
				<Button rightIcon={<AddIcon />} onClick={onOpen}>
					New Group Chat
				</Button>
				<CreateChatModal isOpen={isOpen} onClose={onClose} />
			</Box>
			<VStack align={'stretch'} spacing={3} padding={'1rem 0rem'}>
				<ChatPreview />
				<ChatPreview />
			</VStack>
		</Box>
	);
};

export default MyChats;
