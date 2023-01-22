export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
  user: UserAuthResponse
}

export interface UserAuthResponse {
  email: string,
  id: string,
  isActivated: boolean,
  name: string
}
