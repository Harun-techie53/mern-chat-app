import React from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

const ChatPreview = () => {
	return (
		<Box
			padding={'0.7rem'}
			bg={'gray.200'}
			borderRadius={'0.5rem'}
			cursor={'pointer'}
			_hover={{ bg: 'gray.300' }}
		>
			<Text _hover={{ fontWeight: 'bold' }} fontSize={'lg'}>
				Guest User
			</Text>
			<Box display={'flex'} alignItems={'center'} fontSize={'sm'}>
				<Text fontWeight={'bold'} marginRight={'0.3rem'}>
					Harun:
				</Text>
				<Text>Hellooooo...</Text>
			</Box>
		</Box>
	);
};

export default ChatPreview;
