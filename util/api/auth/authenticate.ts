import ApiFetcher from '../api_fetcher';

type AuthBody = {
  username: string;
  password: string;
};

export async function authenticate(data: AuthBody): Promise<string> {
  const fetcher = new ApiFetcher();

  const auth = await fetcher.post<{ 'auth-token': string }>('/auth', data);

  if (auth.status === 404) {
    throw new AuthError(false);
  } else if (auth.status === 401) {
    throw new AuthError(true);
  }

  return auth.data['auth-token'];
}

export class AuthError extends Error {
  constructor(public readonly found: boolean) {
    super('Could not authenticate');
  }
}
