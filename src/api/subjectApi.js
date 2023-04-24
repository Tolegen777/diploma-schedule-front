import { axiosInstance } from './index';

export const subjectApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
      `subjects?pageCurrent=${page}&pageSize=${size}&pageTotal=0&${filter}`
    );
    return response.data;
  },

  createApi: async (data) => {
    const response = await axiosInstance.post('subjects', data);
    return response.data;
  },

  updateApi: async ({ id, ...data }) => {
    const response = await axiosInstance.put(`subjects/${id}`, data);
    return response.data;
  },

  removeApi: async (id) => {
    const response = await axiosInstance.delete(`subjects/${id}`);
    return response.data;
  },

  getByIdApi: async (id) => {
    const response = await axiosInstance.get(`subjects/${id}`);
    return response.data;
  },
};
