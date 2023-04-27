import React from 'react';
import {
	Stack,
	Text,
	Input,
	InputRightElement,
	Button,
	InputGroup,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';

const SignUpForm = () => {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	return (
		<Stack spacing={5}>
			<FormControl isRequired>
				<FormLabel>Name</FormLabel>
				<Input placeholder="Enter Name" variant={'outline'} />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input placeholder="Enter Email" variant={'outline'} />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input
						pr="4.5rem"
						type={show ? 'text' : 'password'}
						placeholder="Enter Password"
						variant={'outline'}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup size="md">
					<Input
						pr="4.5rem"
						type={show ? 'text' : 'password'}
						placeholder="Confirm Password"
						variant={'outline'}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Button colorScheme="blue">Sign In</Button>
		</Stack>
	);
};

export default SignUpForm;
