import { axiosInstance } from './index';

export const authApi = {
  signInUser: async (user) => {
    const response = await axiosInstance.post('user/v1/auth/signin', user);
    return response.data
  },
};
