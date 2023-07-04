import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const SendMessage = () => {
	return (
		<Box display={'flex'} justifyContent={'flex-end'}>
			<Box
				margin={'0.5rem 0rem'}
				bg={'blue.200'}
				w={'fit-content'}
				display={'flex'}
				alignItems={'flex-end'}
				borderRadius={'0.4rem'}
				padding={'0.4rem'}
			>
				<Text marginRight={'0.5rem'}>Hello World</Text>
				<Text fontSize={'xs'}>11:27 PM</Text>
			</Box>
		</Box>
	);
};

export default SendMessage;
