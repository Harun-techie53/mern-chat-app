import React from 'react';
import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const ChatBoxHeader = ({ user }) => {
	return (
		<Box
			bg={'gray.100'}
			padding={'1rem'}
			borderRadius={'0.5rem 0.5rem 0 0'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<Box display={'flex'} alignItems={'center'}>
				<Avatar
					size={'sm'}
					name={user.name}
					src={user.photo}
					marginRight={'0.7rem'}
				/>
				<Text fontSize={'lg'}>{user.name}</Text>
			</Box>
			<Menu>
				<MenuButton as={IconButton}>
					<HamburgerIcon />
				</MenuButton>
				<MenuList>
					<MenuItem>Delete Chat</MenuItem>
					<MenuItem>Block</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	);
};

export default ChatBoxHeader;
