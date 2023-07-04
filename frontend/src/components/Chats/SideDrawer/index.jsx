import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
} from '@chakra-ui/react';

function SideDrawer({ sideDrawerRef, isOpen, onClose }) {
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
						<Input placeholder="Search User..." />
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
