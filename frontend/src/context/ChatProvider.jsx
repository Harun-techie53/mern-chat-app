import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { utility } from '../helpers/utility';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [userDetails, setUserDetails] = useState(null);
	const userData = utility.getAuthUser();

	useEffect(() => {
		if (userData) {
			setUserDetails({
				authToken: userData.token,
				user: userData.data.user,
			});
		}
	}, []);

	return (
		<>
			<ChatContext.Provider
				value={{ userDetails, setUserDetails, selectedUser, setSelectedUser }}
			>
				{children}
			</ChatContext.Provider>
		</>
	);
};

export const useChatState = () => {
	return useContext(ChatContext);
};

export default ChatProvider;
