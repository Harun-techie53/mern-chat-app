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

const ChatBoxHeader = () => {
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
					name="Dan Abrahmov"
					src="https://bit.ly/dan-abramov"
					marginRight={'0.7rem'}
				/>
				<Text fontSize={'lg'}>Harunur Rashid</Text>
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
