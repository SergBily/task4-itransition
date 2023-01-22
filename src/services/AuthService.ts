import { AxiosResponse } from 'axios';
import $api from '../http';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../libs/localStorage';
import { AuthResponse, UserAuthResponse } from '../models/AuthResponse';
import RegistrationUser from '../models/RegistrationUser';

export default class AuthService {
  static async login(userData: Omit<RegistrationUser, 'name'>): Promise<UserAuthResponse> {
    const response = await $api.post<AuthResponse>('/login', userData);
    const { data } = response;
    if (data) {
      <UserAuthResponse><unknown>setLocalStorage('user', data.user);
      <string><unknown>setLocalStorage('token', data.accessToken);
    }
    return data.user;
  }

  static async registration(userData: RegistrationUser): Promise<UserAuthResponse> {
    const response = await $api.post<AuthResponse>('/registration', userData);
    const { data } = response;
    if (data) {
      <UserAuthResponse><unknown>setLocalStorage('user', data.user);
      <string><unknown>setLocalStorage('token', data.accessToken);
    }
    return data.user;
  }

  static async logout(): Promise<void> {
    const userId: UserAuthResponse = getLocalStorage('user');
    removeLocalStorage('user');
    removeLocalStorage('token');
    return $api.post('/logout', { id: userId.id });
  }

  static async getAllUsers(): Promise<AxiosResponse<UserAuthResponse>> {
    return $api.get<UserAuthResponse>('/users');
  }
}
