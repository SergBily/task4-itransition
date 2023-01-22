import { AxiosResponse } from 'axios';
import $api from '../http';
import BlockParam from '../models/type';
import UserResponse, { Data } from '../models/UsersResponse';

export default class UserService {
  static async getAllUsers(): Promise<Data[]> {
    const response = await $api.get<UserResponse[]>('/users');
    const { data } = response;
    const a: any = [];
    data.forEach((d) => {
      const {
        _id: id, name, email, registrationDate, lastLoginDate, status, access,
      } = d;
      a.push({
        id, name, email, registrationDate, lastLoginDate, status, access,
      });
    });
    return a as Data[];
  }

  static async deleteUsers(summuaryId: string[]): Promise<AxiosResponse<any, any>[]> {
    const promises = summuaryId.map((id) => $api.delete(`/users/${id}`));
    return Promise.all(promises);
  }

  static async blockAndUnblockUsers(param: BlockParam): Promise<AxiosResponse<any, any>[]> {
    const promises = param.summuaryId.map((id) => $api.patch(`/users/${id}`, { access: param.access }));
    return Promise.all(promises);
  }
}
