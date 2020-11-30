import ApiFetcher, { ErrorMessage } from '../api_fetcher';
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

  public async getList(): Promise<UserData[]> {
    const { data } = await this.fetcher.get<Body[]>('/user');

    return (data as Body[])
      .map(bodyToUserData)
      .sort((el1, el2) => (el1.username > el2.username ? 1 : -1));
  }

  public async getUserData(id: number): Promise<UserData> {
    const { data } = await this.fetcher.get<Body>(`/user/${id}`);

    return bodyToUserData(data as Body);
  }

  public async updateUser(id: number, body: Partial<UserData>) {
    const { data, status } = await this.fetcher.put<Body>(
      `/user/${id}`,
      userDataToBody(body),
    );

    if (status !== 200) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToUserData(data as Body);
  }

  public async createUser(body: UserData) {
    const { data, status } = await this.fetcher.post<Body>(
      '/user',
      userDataToBody(body),
    );

    if (status !== 201) {
      const errorMessage = data as ErrorMessage;

      throw new Error(errorMessage.message);
    }

    return bodyToUserData(data as Body);
  }

  public async deleteUser(body: UserData) {
    const { status } = await this.fetcher.delete(`/user/${body.id}`);

    return status === 200;
  }
}

const bodyToUserData: (body: Body) => UserData = (body: Body) => ({
  id: body.id,
  username: body.username,
  realName: body.real_name,
  email: body.email,
  roles: body.roles,
  registrationNumber: body.registration_number,
});

const userDataToBody: (userData: Partial<UserData>) => Partial<Body> = (
  userData: Partial<UserData>,
) => ({
  id: userData.id,
  username: userData.username,
  real_name: userData.realName,
  registration_number: userData.registrationNumber,
  roles: userData.roles && [...userData.roles, 'NONE'],
  email: userData.email,
});

type Body = {
  id: number;
  username: string;
  real_name: string;
  registration_number: number;
  roles: Role[];
  email: string;
};
