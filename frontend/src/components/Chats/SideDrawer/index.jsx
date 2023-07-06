import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Input,
	VStack,
	Box,
	Stack,
	Skeleton,
} from '@chakra-ui/react';
import UserChatPreview from './UserChatPreview';
import { useEffect, useState } from 'react';
import { useChatState } from '../../../context/ChatProvider';
import { apiGet } from '../../../helpers/axios/config';

const renderSkeleton = () => {
	return (
		<Stack margin={'1rem 0rem'}>
			{[1, 2, 3, 4, 5].map((item) => (
				<Skeleton height="40px" key={item} />
			))}
		</Stack>
	);
};

function SideDrawer({ sideDrawerRef, isOpen, onClose }) {
	const { userDetails, setSelectedUser } = useChatState();
	const [searchValue, setSearchValue] = useState('');
	const [searchUsers, setSearchUsers] = useState([]);
	const [isSearchUsersLoading, setIsSearchUsersLoading] = useState(false);
	const fetchAllUsers = async () => {
		try {
			setIsSearchUsersLoading(true);

			const data = await apiGet({ apiPath: '/user' });

			setSearchUsers([...data.users]);
		} catch (error) {
			setIsSearchUsersLoading(false);
			console.log('error', error);
		} finally {
			setSearchValue('');
			setIsSearchUsersLoading(false);
		}
	};

	useEffect(() => {
		fetchAllUsers();
	}, [userDetails]);

	const handleSelectUserToChat = (user) => {
		setSelectedUser(user);
		onClose();
	};

	return (
		<>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={sideDrawerRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Find User Here</DrawerHeader>

					<DrawerBody>
						<form>
							<Input
								placeholder="Search User..."
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
							/>
						</form>
						{isSearchUsersLoading ? (
							renderSkeleton()
						) : (
							<VStack align={'stretch'} margin={'1rem 0rem'}>
								{searchUsers.map((user) => (
									<Box onClick={() => handleSelectUserToChat(user)}>
										<UserChatPreview user={user} key={user._id} />
									</Box>
								))}
							</VStack>
						)}
					</DrawerBody>

					{/* <DrawerFooter>
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="blue">Save</Button>
					</DrawerFooter> */}
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default SideDrawer;
