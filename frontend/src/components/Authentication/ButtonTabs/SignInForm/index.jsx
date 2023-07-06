import React, { useState } from 'react';
import {
	Stack,
	Text,
	Input,
	InputRightElement,
	Button,
	InputGroup,
	FormControl,
	FormLabel,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { globalConstants } from '../../../../constants';
import { useChatState } from '../../../../context/ChatProvider';

const SignInForm = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { setUserDetails } = useChatState();
	const [inputFields, setInputFields] = useState({
		email: '',
		password: '',
	});
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const [input, setInput] = useState('');
	const [isGuestCredentialsEnable, setIsGuestCredentialsEnable] =
		useState(false);

	const handleInputChange = (e) => {
		setInputFields({
			...inputFields,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(
				'http://localhost:8000/v1/user/signIn',
				JSON.stringify(inputFields),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (data.status === 'success') {
				localStorage.setItem('user', JSON.stringify(data));
				setUserDetails({ authToken: data.token, user: data.data.user });
				setInputFields({
					...inputFields,
					email: '',
					password: '',
				});

				toast({
					title: 'Logged In Successfully',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});

				setTimeout(() => {
					navigate('/chat');
				}, 6000);
			}
		} catch (error) {
			localStorage.removeItem('user');
			toast({
				title: 'Error Occured!',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleGuestUserCredentials = () => {
		setInputFields({
			...inputFields,
			email: globalConstants.GUEST_USER_EMAIL,
			password: globalConstants.GUEST_USER_PASSWORD,
		});
	};
	return (
		<form onSubmit={handleFormSubmit}>
			<Stack spacing={5}>
				<FormControl isRequired>
					<FormLabel>Email Address</FormLabel>
					<Input
						name="email"
						value={inputFields.email}
						onChange={handleInputChange}
						placeholder="Enter Email"
						variant={'outline'}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<InputGroup size="md">
						<Input
							name="password"
							pr="4.5rem"
							type={show ? 'text' : 'password'}
							placeholder="Enter Password"
							variant={'outline'}
							value={inputFields.password}
							onChange={handleInputChange}
						/>
						<InputRightElement width="4.5rem">
							<Button h="1.75rem" size="sm" onClick={handleClick}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<Button colorScheme="blue" type="submit">
					Sign In
				</Button>
				<Button colorScheme="red" onClick={handleGuestUserCredentials}>
					Get Guest User Credential
				</Button>
			</Stack>
		</form>
	);
};

export default SignInForm;
