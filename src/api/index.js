// eslint-disable-next-line prettier/prettier
import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosError } from 'axios';
import axios from 'axios';

import { tokenService } from '../services/tokenService';
import { customConfirmAction } from '../utils/customConfirmAction';
import { customNotification } from '../utils/customNotification';
import { authApi } from './authApi';

type FailedQueue = {
  reject: (error: Error | null) => void;
  resolve: (token: string | null) => void;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// for multiple requests
// eslint-disable-next-line functional/no-let
let isRefreshing = false;
// eslint-disable-next-line functional/no-let
let failedQueue: FailedQueue[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use((config) => {
  const accessToken = tokenService.getLocalAccessToken()

  if (accessToken) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  }

  return config
})


axiosInstance.interceptors.response.use(
  ( response ) =>
    response, async ( error ) => {

    const originalRequest: AxiosRequestConfig<AxiosRequestHeaders> & {
      _retry: boolean
    } = error.config

    const errorStatus = error.response.data.status_code;

    if (error.response.data.message === 'session_expired') {
      customConfirmAction('Время вашего сеанса истекло, пожалуйста, войдите снова!')
    }

    if (errorStatus === 401 && !originalRequest._retry && tokenService.getLocalAccessToken()) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {

          failedQueue.push({ resolve, reject })


        }).then((token) => {

          if (originalRequest.headers) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            originalRequest.headers.Authorization = `Bearer ${token}`
          }

          return axiosInstance(originalRequest)

        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        void authApi.refreshAccessToken(tokenService.getLocalRefreshToken()).then((response) => {

          // Set refresh access and refresh token
          tokenService.updateLocalTokenData(response.access_token, 'access_token')
          tokenService.updateLocalTokenData(response.refresh_token, 'refresh_token')

          axios.defaults.headers.common.Authorization = `Bearer ${response.access_token}`;

          if (originalRequest && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
          }

          // Send requests without errors, with new access token
          processQueue(null, response.access_token)
          resolve(axiosInstance(originalRequest))

        }).catch((err: AxiosError) => {
          processQueue(err, null)
          reject(error)
        }).then(() => {
          isRefreshing = false
        })
      })
    }

    if (errorStatus !== 401) {
      const errorMessage = error.response.data.message
      customNotification({
        type: 'error',
        message: errorMessage.length ? errorMessage : 'Ошибка сервера'
      })
    }

    return Promise.reject(error)
  });




