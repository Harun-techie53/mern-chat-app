import React from 'react';
import {
	Tab,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Button,
} from '@chakra-ui/react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const ButtonTabs = () => {
	return (
		<Tabs isFitted variant="soft-rounded" colorScheme="green" paddingY={'4'}>
			<TabList>
				<Tab>Sign In</Tab>
				<Tab>Sign Up</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<SignInForm />
				</TabPanel>
				<TabPanel>
					<SignUpForm />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default ButtonTabs;
