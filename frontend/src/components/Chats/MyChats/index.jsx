import { AddIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Skeleton,
	Stack,
	Text,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';

import React, { useEffect } from 'react';
import CreateChatModal from './CreateChatModal';
import GroupChatPreview from './GroupChatPreview';
import { useChatState } from '../../../context/ChatProvider';
import axios from 'axios';
import { useState } from 'react';
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

const MyChats = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isGroupChatsLoading, setIsGroupChatsLoading] = useState(false);
	const [groupChats, setGroupChats] = useState([]);
	const { userDetails } = useChatState();

	const fetchAllGroupChats = async () => {
		try {
			setIsGroupChatsLoading(true);

			const data = await apiGet({ apiPath: '/chat/group-chat' });

			setGroupChats([...data.groupChats]);
		} catch (error) {
			setIsGroupChatsLoading(false);
			console.log('error', error);
		} finally {
			setIsGroupChatsLoading(false);
		}
	};

	useEffect(() => {
		fetchAllGroupChats();
	}, [userDetails]);

	return (
		<Box w={'40%'} bg={'white'} borderRadius={'0.5rem'} padding={'1rem'}>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<Text fontSize={'xl'}>My Chats</Text>
				<Button rightIcon={<AddIcon />} onClick={onOpen}>
					New Group Chat
				</Button>
				<CreateChatModal isOpen={isOpen} onClose={onClose} />
			</Box>
			<VStack align={'stretch'} spacing={3} padding={'1rem 0rem'}>
				{isGroupChatsLoading
					? renderSkeleton()
					: groupChats.map((groupChat) => (
							<GroupChatPreview key={groupChat._id} groupChat={groupChat} />
					  ))}
			</VStack>
		</Box>
	);
};

export default MyChats;
