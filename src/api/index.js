import axios from 'axios';

import { tokenService } from '../services/tokenService';
import { customNotification } from '../utils/customNotification';

const BASE_URL = 'https://university-scheduler.herokuapp.com/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

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
    if (error?.response) {
      // debugger
      const errorMessage = error.response.data.message
      if (errorMessage === 'Not authorized') {
        localStorage.clear()
        window.location.replace('/');
      } else {
        debugger
        customNotification({
          type: 'error',
          message: errorMessage.length ? errorMessage : 'Ошибка сервера'
        })
      }

    }

    return Promise.reject(error)
  });





