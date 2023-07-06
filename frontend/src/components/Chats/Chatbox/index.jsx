import { Box, FormControl, IconButton, Input, Text } from '@chakra-ui/react';
import React from 'react';
import ChatBoxHeader from './ChatBoxHeader';
import { AttachmentIcon } from '@chakra-ui/icons';
import SendMessage from './ChatMessages/SendMessage';
import RecieveMessage from './ChatMessages/RecieveMessage';
import { useChatState } from '../../../context/ChatProvider';

const Chatbox = () => {
	const { selectedUser } = useChatState();
	return (
		<Box
			w={'100%'}
			bg={'white'}
			borderRadius={'0.5rem 0 0 0'}
			marginLeft={'1rem'}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'space-between'}
		>
			{selectedUser ? (
				<>
					<Box>
						<ChatBoxHeader user={selectedUser} />
						<Box
							margin={'1rem'}
							position={'relative'}
							overflowY={'scroll'}
							h={'container.sm'}
						>
							<RecieveMessage />
							<SendMessage />
							<RecieveMessage />
							<RecieveMessage />
							<RecieveMessage />
							<SendMessage />
							<SendMessage />
							<SendMessage />
							<RecieveMessage />
							<RecieveMessage />
							<RecieveMessage />
							<RecieveMessage />
							<RecieveMessage />
							<RecieveMessage />
							<RecieveMessage />
						</Box>
					</Box>
					<Box
						bg={'gray.200'}
						padding={'1rem'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
						borderRadius={'0rem 0rem 0.5rem 0.5rem'}
					>
						<IconButton
							isRound={true}
							icon={<AttachmentIcon fontSize={'lg'} />}
						/>
						<FormControl>
							<Input placeholder="Type a message" bg={'gray.50'} />
						</FormControl>
					</Box>
				</>
			) : (
				<Text>Select User to Start a Conversation</Text>
			)}
		</Box>
	);
};

export default Chatbox;
