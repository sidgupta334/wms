import axios, { AxiosResponse } from 'axios';
import { set } from 'lodash';

const BASE_API_URL = '/api';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const axiosApi = (resource?: string, options = {}) => {
  const baseURLSuffix = resource ? `${resource}/` : '';
  const axiosInstance = axios.create({
    baseURL: `${BASE_API_URL}/${baseURLSuffix}`,
    headers: DEFAULT_HEADERS,
    withCredentials: true,
    ...options,
  });

  axiosInstance.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('wms-auth-token');
    if (authToken) {
      set(config, 'headers.Authorization', `Bearer ${authToken}`);
    }

    if (config.baseURL?.endsWith('/')) {
      config.baseURL = config.baseURL.slice(0, config.baseURL.length - 1);
    }
    return config;
  });

  axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    return response.data;
  });
  return axiosInstance;
};

export default axiosApi;
