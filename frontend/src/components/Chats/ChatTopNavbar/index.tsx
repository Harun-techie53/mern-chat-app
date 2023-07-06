import React, { useMemo } from 'react';
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	WrapItem,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useChatState } from '../../../context/ChatProvider';

const ChatTopNavbar = ({ sideDrawerRef, onOpen }) => {
	const navigate = useNavigate();
	const { userDetails, setUserDetails } = useChatState();
	const user = useMemo(() => userDetails?.user, [userDetails]);
	const handleLogOut = () => {
		localStorage.removeItem('user');
		setUserDetails(null);
		navigate('/');
	};
	return (
		<Box
			w={'100%'}
			bg={'white'}
			padding={'0.7rem'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<Button leftIcon={<SearchIcon />} ref={sideDrawerRef} onClick={onOpen}>
				Search User
			</Button>
			<Text fontSize={'2xl'}>Talk-A-Tive</Text>
			<Box display={'flex'} alignItems={'center'}>
				<IconButton
					isRound={true}
					variant="outline"
					colorScheme="teal"
					aria-label="Send email"
					icon={<BellIcon fontSize={'xl'} />}
				/>
				<Box marginLeft={'1rem'}>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							<Avatar size={'sm'} name={user?.name} src={user?.photo} />
						</MenuButton>
						<MenuList w={'10%'}>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem onClick={handleLogOut}>Log Out</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatTopNavbar;
