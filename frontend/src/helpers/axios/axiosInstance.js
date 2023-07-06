import axios from 'axios';

import { utility } from '../utility';

const API_BASE_URL = 'http://localhost:8000/v1';
const axiosInstance = (token = null) => {
	const instance = axios.create();

	instance.defaults.headers.post['Content-Type'] = 'application/json';
	instance.defaults.headers['Accept'] = 'application/json';

	instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	instance.defaults.timeout = 60000;
	instance.defaults.baseURL = API_BASE_URL;
	const authData = utility.getAuthUser();
	if (authData?.token) {
		token = authData.token;
	}
	if (token) {
		instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	}

	instance.interceptors.request.use(
		function (config) {
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		function (response) {
			const responseObject = {
				success: true,
				statusCode: response?.data?.statusCode,
				message: response?.data?.message,
				data: response?.data?.data,
				meta: response?.data?.meta,
			};
			return responseObject;
		},
		function (error) {
			const responseObject = {
				success: false,
				statusCode: error?.response?.data?.statusCode || 500,
				message: error?.response?.data?.message || 'Something Went Wrong',
				errorMessages: error?.response?.data?.message,
			};

			return Promise.reject(responseObject);
		}
	);
	return instance;
};
export default axiosInstance;
