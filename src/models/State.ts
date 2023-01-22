import { UserAuthResponse } from './AuthResponse';
import { Data } from './UsersResponse';

export interface UserState {
  user: UserAuthResponse | null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string
}

export interface ManagementState {
  users: Data[] | null,
  isSuccess: boolean,
  isLoading: boolean
}
