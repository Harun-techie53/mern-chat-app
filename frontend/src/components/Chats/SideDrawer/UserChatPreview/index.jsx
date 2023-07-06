import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';

const UserChatPreview = ({ user }) => {
	return (
		<Box
			bg={'gray.100'}
			padding={'0.7rem 1rem'}
			display={'flex'}
			alignItems={'center'}
			borderRadius={'0.4rem'}
			cursor={'pointer'}
			_hover={{ bg: 'gray.200' }}
		>
			<Avatar size={'sm'} name={user.name} src={user.photo} />
			<Box marginLeft={'0.5rem'}>
				<Text fontSize={'md'}>{user.name}</Text>
				<Box display={'flex'} alignItems={'center'} fontSize={'xs'}>
					<Text marginRight={'0.2rem'}>Email:</Text>
					<Text>{user.email}</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default UserChatPreview;
