import ApiFetcher from '../api_fetcher';
import { UserData } from '../user/user';
import { Role } from './roles';

export default async function getUserData(
  token: string,
): Promise<UserData | null> {
  const fetcher = new ApiFetcher(token);

  const resp = await fetcher.get<ResponseBody>('/auth');
  const userData = resp.data as ResponseBody;

  return {
    id: userData.id,
    username: userData.username,
    realName: userData.real_name,
    registrationNumber: userData.registration_number,
    roles: userData.roles,
    email: userData.email,
  };
}

type ResponseBody = {
  id: number;
  username: string;
  real_name: string;
  registration_number: number;
  roles: Role[];
  email: string;
};
