import {
	Button,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

function CreateChatModal({ isOpen, onClose }) {
	return (
		<>
			<Modal aria isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Group Chat</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<Input placeholder="Chat Name" />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="solid" colorScheme="whatsapp">
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CreateChatModal;
