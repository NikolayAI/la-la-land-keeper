import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

interface IAxiosParams<D> {
  url: string;
  data?: D;
  config?: AxiosRequestConfig<D>;
}

export class HttpClient {
  static async get<T = any, R = AxiosResponse<T>, D = any>({ url, config }: Omit<IAxiosParams<D>, 'data'>): Promise<R> {
    return instance.get(url, config);
  }

  static async post<T = any, R = AxiosResponse<T>, D = any>({ url, data, config }: IAxiosParams<D>): Promise<R> {
    return instance.post(url, data, config).then((res) => res.data);
  }
}
