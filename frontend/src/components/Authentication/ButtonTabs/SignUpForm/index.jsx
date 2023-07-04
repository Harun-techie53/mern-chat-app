import React, { useState, useEffect } from 'react';
import {
	Stack,
	Text,
	Input,
	InputRightElement,
	Button,
	InputGroup,
	FormControl,
	FormLabel,
	HStack,
	CircularProgress,
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../../firebase';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const SignUpForm = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const fileInput = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [res, setRes] = useState(null);
	const [downloadUrl, setDownloadUrl] = useState('');
	const [inputFields, setInputFields] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		photo: null,
	});
	const [show, setShow] = useState({
		password: false,
		password2: false,
	});
	const handleClick = (e) =>
		setShow({
			...show,
			[e.target.name]: !show.e.target.name,
		});

	const handleInputChange = (e) => {
		setInputFields({
			...inputFields,
			[e.target.id]: e.target.value,
		});
	};

	const handleFileChange = (e) => {
		if (e.target.files) {
			setInputFields({
				...inputFields,
				photo: e.target.files[0],
			});
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (inputFields.password !== inputFields.password2) {
			toast({
				title: 'Bad Request!',
				description: "Password didn't match",
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		const { photo, name, email, password, password2 } = inputFields;

		if (photo === undefined) {
			toast({
				title: 'File Upload Failed!',
				description: 'File upload failed.',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		setIsLoading(true);

		if (photo) {
			const storageRef = ref(storage, `photos/${photo.name}`);
			const uploadTask = uploadBytesResumable(storageRef, photo);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					setIsLoading(false);
					toast({
						title: 'Error Occured!',
						description: error.message,
						status: 'error',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});
					return;
				},
				async () => {
					const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

					const res = await axios.post(
						'http://localhost:8000/v1/user/signUp',
						JSON.stringify({
							name,
							email,
							password,
							confirmPassword: password2,
							photo: downloadUrl,
						}),
						{
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);
					setIsLoading(false);
					if (res.status === 200) {
						localStorage.setItem('user', JSON.stringify(res.data));
						toast({
							title: 'Registration Completed Successfully!',
							description: 'Registration Completed Successfully.',
							status: 'success',
							duration: 5000,
							isClosable: true,
							position: 'bottom',
						});

						setTimeout(() => {
							navigate('/chat');
						}, 5000);
					}
				}
			);
		} else {
			try {
				const res = await axios.post(
					'http://localhost:8000/v1/user/signUp',
					JSON.stringify({
						name,
						email,
						password,
						confirmPassword: password2,
					}),
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				setIsLoading(false);

				if (res.status === 200) {
					localStorage.setItem('user', JSON.stringify(res.data));
					toast({
						title: 'Registration Completed Successfully!',
						description: 'Registration Completed Successfully.',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});

					setTimeout(() => {
						navigate('/chat');
					}, 5000);
				}
			} catch (error) {
				setIsLoading(false);
				localStorage.removeItem('user');
				toast({
					title: 'Error Occured!',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			}
		}

		setInputFields({
			name: '',
			email: '',
			password: '',
			password2: '',
			photo: null,
		});
		fileInput.current.value = null;
	};
	return (
		<form onSubmit={handleFormSubmit}>
			<Stack spacing={5}>
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input
						placeholder="Enter Name"
						variant={'outline'}
						id="name"
						value={inputFields.name}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Email Address</FormLabel>
					<Input
						placeholder="Enter Email"
						variant={'outline'}
						id="email"
						value={inputFields.email}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Password</FormLabel>
					<InputGroup size="md">
						<Input
							pr="4.5rem"
							type={show ? 'text' : 'password'}
							placeholder="Enter Password"
							variant={'outline'}
							id="password"
							value={inputFields.password}
							onChange={handleInputChange}
						/>
						<InputRightElement width="4.5rem">
							<Button
								h="1.75rem"
								size="sm"
								name="password"
								onClick={handleClick}
								value={show.password}
							>
								{show.password ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<FormControl>
					<FormLabel>Confirm Password</FormLabel>
					<InputGroup size="md">
						<Input
							pr="4.5rem"
							type={show ? 'text' : 'password'}
							placeholder="Confirm Password"
							variant={'outline'}
							id="password2"
							value={inputFields.password2}
							onChange={handleInputChange}
						/>
						<InputRightElement width="4.5rem">
							<Button
								h="1.75rem"
								size="sm"
								name="password2"
								value={show.password2}
								onClick={handleClick}
							>
								{show.password2 ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<HStack>
					<FormControl>
						<FormLabel>Upload Your Picture</FormLabel>
						{/* <input
						type="file"
						value={inputFields.file}
						onChange={handleFileChange}
						accept=".png, .jpg, .jpeg"
					/> */}
						<Input
							ref={fileInput}
							type="file"
							name="photo"
							onChange={handleFileChange}
							accept=".png, .jpg, .jpeg"
						/>
					</FormControl>
					<CircularProgress value={progress} />
				</HStack>
				<HStack>
					<Button
						rightIcon={isLoading && <Spinner />}
						variant="solid"
						type="submit"
						colorScheme="blue"
						width={'100%'}
					>
						Sign Up
					</Button>
				</HStack>
			</Stack>
		</form>
	);
};

export default SignUpForm;
