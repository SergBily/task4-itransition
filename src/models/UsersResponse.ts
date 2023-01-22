export default interface UserResponse {
  _id: string,
  name: string,
  email: string,
  password: string,
  isActivated: boolean,
  activationLink: string,
  registrationDate: string,
  status: string,
  lastLoginDate: string,
  __v: number,
  access: string
}

export interface Data {
  name: string;
  registrationDate: string;
  email: string;
  id: string;
  lastLoginDate: string;
  status: string;
  access: string;
}
