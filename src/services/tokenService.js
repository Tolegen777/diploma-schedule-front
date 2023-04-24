// eslint-disable-next-line prettier/prettier
import type { IAuthResponse } from '../types/authTypes';

export const tokenService = {
  getLocalAccessToken: () => {
    return localStorage.getItem('UNIVERSITY');

  },

  updateLocalTokenData: (token) => {
    localStorage.setItem('UNIVERSITY', JSON.stringify(token));
  },
};
