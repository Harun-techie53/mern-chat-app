import axios from 'axios';
import axiosInstance from './axiosInstance';
import * as utils from '../utility';

function transformConfig(config, data) {
	let transformedData = data;
	if (
		config &&
		utils.isDefined(config, 'headers') &&
		utils.isDefined(config.headers, 'Content-Type') &&
		config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
	) {
		transformedData = JSON.stringify(data);
	}
	return transformedData;
}

function apiGet({
	apiPath,
	config = {},
	withCredentials = false,
	external = false,
}) {
	const axiosToUse = external ? axios : axiosInstance();
	const fullUrl = apiPath;
	const newConfig = {
		...config,
		withCredentials,
	};

	return new Promise(async (resolve, reject) => {
		try {
			const response = await axiosToUse.get(fullUrl, newConfig);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
}

const apiPost = ({
	apiPath,
	data,
	config = {},
	withCredentials = false,
	external = false,
}) => {
	const newConfig = {
		...config,
		withCredentials,
	};

	const transformedData = transformConfig(newConfig, data);
	const axiosToUse = external ? axios : axiosInstance();
	const fullUrl = apiPath;
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axiosToUse.post(
				fullUrl,
				transformedData,
				newConfig
			);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

function apiPut({ apiPath, data, config = {}, external = false }) {
	const newConfig = {
		...config,
	};
	const transformedData = transformConfig(newConfig, data);
	const axiosToUse = external ? axios : axiosInstance();
	const fullUrl = apiPath;

	return new Promise(async (resolve, reject) => {
		try {
			const response = await axiosToUse.put(
				fullUrl,
				transformedData,
				newConfig
			);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
}

function apiPatch({ apiPath, data, config = {}, external = false }) {
	const newConfig = {
		...config,
	};
	const transformedData = transformConfig(newConfig, data);
	const axiosToUse = external ? axios : axiosInstance();
	const fullUrl = apiPath;

	return new Promise(async (resolve, reject) => {
		try {
			const response = await axiosToUse.patch(
				fullUrl,
				transformedData,
				newConfig
			);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
}

function apiDelete({ apiPath, config = {}, external = false }) {
	const newConfig = {
		...config,
	};
	const axiosToUse = external ? axios : axiosInstance();
	const fullUrl = apiPath;

	return new Promise(async (resolve, reject) => {
		try {
			const response = await axiosToUse.delete(fullUrl, newConfig);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
}

export { apiDelete, apiGet, apiPost, apiPut, apiPatch };
