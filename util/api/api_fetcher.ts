import timeout from '../helper/timeout';
import Config from 'react-native-config';

type Response<T> = {
  status: number;
  data: T;
};

const DEFAULT_TIMEOUT = 6000;

export default class ApiFetcher {
  private headers: { [key: string]: string };
  private onExpire?: () => void;

  constructor(public readonly userToken?: string) {
    this.headers = {
      'Content-Type': 'application/json',
    };

    if (userToken) {
      this.headers['auth-token'] = userToken;
    }
  }

  public setOnExpire(func: () => void) {
    this.onExpire = func;
  }

  public async get<T>(
    url: string,
    fetchTimeout?: number,
  ): Promise<Response<T>> {
    const [response, data] = await this.fetch(url, 'GET', fetchTimeout);

    return {
      status: response.status,
      data: data,
    };
  }

  public async post<T>(
    url: string,
    body: object,
    fetchTimeout?: number,
  ): Promise<Response<T>> {
    const [response, data] = await this.fetch(url, 'POST', fetchTimeout, body);

    return {
      status: response.status,
      data: data,
    };
  }

  private async fetch(
    url: string,
    method: 'GET' | 'POST',
    fetchTimeout?: number,
    body?: object,
  ) {
    const promise = fetch(`${Config.API_URL}/api${url}`, {
      method: method,
      headers: this.headers,
      body: body && JSON.stringify(body),
    });

    const response = await timeout(fetchTimeout || DEFAULT_TIMEOUT, promise);
    const json = await response.json();

    if (
      response.status === 401 &&
      json.message &&
      json.message === 'Expired token'
    ) {
      this.onExpire && this.onExpire();
      throw new Error('Expired session');
    }

    return [response, json];
  }
}
