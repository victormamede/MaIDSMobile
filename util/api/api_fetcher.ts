import timeout from '../helper/timeout';
import Config from 'react-native-config';

export type Response<T> = {
  status: number;
  data: T | ErrorMessage;
};

export type ErrorMessage = {
  message: any;
};

const DEFAULT_TIMEOUT = 6000;

console.log(`API address: ${Config.API_URL}`);

export default class ApiFetcher {
  private headers: { [key: string]: string };
  private onLossConnection?: () => void;

  constructor(public readonly userToken?: string) {
    this.headers = {
      'Content-Type': 'application/json',
    };

    if (userToken) {
      this.headers['auth-token'] = userToken;
    }
  }

  public setOnLossConnection(func: () => void) {
    this.onLossConnection = func;
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

  public async put<T>(
    url: string,
    body: object,
    fetchTimeout?: number,
  ): Promise<Response<T>> {
    const [response, data] = await this.fetch(url, 'PUT', fetchTimeout, body);

    return {
      status: response.status,
      data: data,
    };
  }

  public async delete<T>(
    url: string,
    fetchTimeout?: number,
  ): Promise<Response<T>> {
    const [response, data] = await this.fetch(url, 'DELETE', fetchTimeout);

    return {
      status: response.status,
      data: data,
    };
  }

  public async testConnection() {
    try {
      await fetch(`${Config.API_URL}/`);

      return true;
    } catch (e) {
      return false;
    }
  }

  private async fetch(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    fetchTimeout?: number,
    body?: object,
  ) {
    try {
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
        this.onLossConnection && this.onLossConnection();
        throw new Error('Expired session');
      }

      return [response, json];
    } catch (e) {
      this.onLossConnection && this.onLossConnection();
      throw e;
    }
  }
}
