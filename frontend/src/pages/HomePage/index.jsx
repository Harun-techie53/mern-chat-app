import { Container, Box, Button } from '@chakra-ui/react';
import React from 'react';
import TitleHeader from '../../components/Authentication/TitleHeader';
import ButtonTabs from '../../components/Authentication/ButtonTabs';

const HomePage = () => {
	return (
		<Container paddingY={'10'}>
			<TitleHeader />
			<Box
				bgColor={'gray.100'}
				padding={'4'}
				boxShadow={'md'}
				borderRadius={'md'}
			>
				<ButtonTabs />
			</Box>
		</Container>
	);
};

export default HomePage;
