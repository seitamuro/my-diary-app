import { fetchAuthSession } from 'aws-amplify/auth';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_ENDPOINT}`,
});
api.interceptors.request.use(async (config) => {
  const token = (await fetchAuthSession()).tokens?.idToken?.toString();

  if (token) {
    config.headers['Authorization'] = `${token}`;
  }

  config.headers['Content-Type'] = 'application/json';

  return config;
});

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const useHttp = () => {
  return {
    api,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: <Data = any, Error = any>(url: string | null, config?: SWRConfiguration) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useSWR<Data, Error>(url, fetcher, config);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post: <RES = any, DATA = any>(
      url: string,
      data: DATA,
      reqConfig?: AxiosRequestConfig,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorProcess?: (error: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .post<RES, AxiosResponse<RES>, DATA>(url, data, reqConfig)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            if (errorProcess) {
              errorProcess(error);
            }
            reject(error);
          });
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put: <RES = any, DATA = any>(
      url: string,
      data: DATA,
      reqConfig?: AxiosRequestConfig,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorProcess?: (error: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .put<RES, AxiosResponse<RES>, DATA>(url, data, reqConfig)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            if (errorProcess) {
              errorProcess(error);
            }
            reject(error);
          });
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete: <RES = any, DATA = any>(
      url: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorProcess?: (error: any) => void
    ) => {
      return new Promise<AxiosResponse<RES>>((resolve, reject) => {
        api
          .delete<RES, AxiosResponse<RES>, DATA>(url)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            if (errorProcess) {
              errorProcess(error);
            }
            reject(error);
          });
      });
    },
  };
};
