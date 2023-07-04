import { Container, Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TitleHeader from '../../components/Authentication/TitleHeader';
import ButtonTabs from '../../components/Authentication/ButtonTabs';
import { useChatState } from '../../context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();
	const { userDetails } = useChatState();

	useEffect(() => {
		if (userDetails) {
			navigate('/chat');
		}
	}, [userDetails]);

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
