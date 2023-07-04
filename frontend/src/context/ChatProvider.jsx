import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [userDetails, setUserDetails] = useState(null);
	const userData = JSON.parse(localStorage.getItem('user') ?? {});

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
			<ChatContext.Provider value={{ userDetails }}>
				{children}
			</ChatContext.Provider>
		</>
	);
};

export const useChatState = () => {
	return useContext(ChatContext);
};

export default ChatProvider;
