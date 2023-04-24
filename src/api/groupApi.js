import { axiosInstance } from './index';

export const groupApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
      `groups?pageCurrent=${page}&pageSize=${size}&pageTotal=0&${filter}`
    );
    return response.data;
  },

  createApi: async (data) => {
    const response = await axiosInstance.post('groups', data);
    return response.data;
  },

  updateApi: async ({ id, ...data }) => {
    const response = await axiosInstance.put(`groups/${id}`, data);
    return response.data;
  },

  removeApi: async (id) => {
    const response = await axiosInstance.delete(`groups/${id}`);
    return response.data;
  },

  getByIdApi: async (id) => {
    const response = await axiosInstance.get(`groups/${id}`);
    return response.data;
  },
};
