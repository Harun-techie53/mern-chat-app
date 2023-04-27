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

const SignInForm = () => {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
	const [input, setInput] = React.useState('');

	const handleInputChange = (e) => setInput(e.target.value);

	const isError = input === '';
	return (
		<Stack spacing={5}>
			<FormControl isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input
					value={input}
					onChange={handleInputChange}
					placeholder="Enter Email"
					variant={'outline'}
				/>
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
			<Button colorScheme="blue">Sign In</Button>
			<Button colorScheme="red">Get Guest User Credential</Button>
		</Stack>
	);
};

export default SignInForm;