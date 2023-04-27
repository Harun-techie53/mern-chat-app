import React from 'react';
import { Center, Text } from '@chakra-ui/react';

const TitleHeader = () => {
	return (
		<Center
			bgColor={'gray.100'}
			padding={'3'}
			boxShadow={'md'}
			marginBottom={'4'}
			borderRadius={'md'}
		>
			<Text fontSize={'4xl'}>Talk-A-Tive</Text>
		</Center>
	);
};

export default TitleHeader;
