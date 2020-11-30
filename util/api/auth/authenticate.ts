import ApiFetcher from '../api_fetcher';

type AuthBody = {
  username: string;
  password: string;
};

type Body = {
  'auth-token': string;
  should_update_password: boolean;
};

export async function authenticate(data: AuthBody): Promise<Body> {
  const fetcher = new ApiFetcher();

  const auth = await fetcher.post<Body>('/auth', data);

  if (auth.status === 404) {
    throw new AuthError(false);
  } else if (auth.status === 401) {
    throw new AuthError(true);
  }

  return auth.data as Body;
}

export class AuthError extends Error {
  constructor(public readonly found: boolean) {
    super('Could not authenticate');
  }
}

export async function updatePassword(token: string, newPassword: string) {
  const fetcher = new ApiFetcher(token);
  const res = await fetcher.post('/auth/password', { password: newPassword });

  return res.status === 200;
}
