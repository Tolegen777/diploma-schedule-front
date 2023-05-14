import { axiosInstance } from './index';

export const authApi = {
  signInUser: async (user) => {
    const response = await axiosInstance.post('auth/login', user);
    return response.data
  },
  authMe: async () => {
    const response = await axiosInstance.get('auth/me');
    return response.data
  },
};
