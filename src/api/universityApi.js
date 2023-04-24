import { axiosInstance } from './index';

export const universityApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
      `universities?pageCurrent=${page}&pageSize=${size}&pageTotal=0&${filter}`
    );
    return response.data;
  },

  createApi: async (data) => {
    const response = await axiosInstance.post('universities', data);
    return response.data;
  },

  updateApi: async ({ id, ...data }) => {
    const response = await axiosInstance.put(`universities/${id}`, data);
    return response.data;
  },

  removeApi: async (id) => {
    const response = await axiosInstance.delete(`universities/${id}`);
    return response.data;
  },

  getByIdApi: async (id) => {
    const response = await axiosInstance.get(`universities/${id}`);
    return response.data;
  },
};
