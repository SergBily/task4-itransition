import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import SERVER_URL from '../environment';
import { getLocalStorage, setLocalStorage } from '../libs/localStorage';
import toastPostionBottom from '../libs/toat-position';
import { AuthResponse } from '../models/AuthResponse';

const $api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getLocalStorage('token')}`;
  return config;
});

$api.interceptors.response.use((config) => config, async (e) => {
  const originalRequest = e.config;
  const codeError = 401;
  if (e.response?.status === codeError && e.config && !e.config.isRetry) {
    originalRequest.isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${SERVER_URL}/refresh`, { withCredentials: true });
      setLocalStorage('token', response.data.accessToken);
      return await $api.request(originalRequest);
    } catch (err) {
      toast.error('User is not unauthorized', toastPostionBottom);
    }
  }
  throw e;
});

export default $api;
