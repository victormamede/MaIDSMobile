import ApiFetcher from '../api_fetcher';
import { Role } from '../auth/roles';

export type UserData = {
  id: number;
  username: string;
  realName: string;
  email: string;
  roles: Role[];
  registrationNumber: number;
};

export default class UserFetcher {
  constructor(private fetcher: ApiFetcher) {}

  public async list(): Promise<UserData[]> {
    const { data } = await this.fetcher.get<Body[]>('/user');

    return data
      .map(bodyToUserData)
      .sort((el1, el2) => (el1.username > el2.username ? 1 : -1));
  }

  public async userData(id: number): Promise<UserData> {
    const { data } = await this.fetcher.get<Body>(`/user/${id}`);

    return bodyToUserData(data);
  }
}

const bodyToUserData = (body: Body) => ({
  id: body.id,
  username: body.username,
  realName: body.real_name,
  email: body.email,
  roles: body.roles,
  registrationNumber: body.registration_number,
});

type Body = {
  id: number;
  username: string;
  real_name: string;
  registration_number: number;
  roles: Role[];
  email: string;
};
