import { axiosInstance } from './index';

export const scheduleApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
      `schedules?pageCurrent=${page}&pageSize=${size}&pageTotal=0&${filter}`
    );
    return response.data;
  },

  createApi: async (data) => {
    const response = await axiosInstance.post('schedules', data);
    return response.data;
  },

  updateApi: async ({ id, ...data }) => {
    const response = await axiosInstance.put(`schedules/${id}`, data);
    return response.data;
  },

  removeApi: async (id) => {
    const response = await axiosInstance.delete(`schedules/${id}`);
    return response.data;
  },

  getByIdApi: async (id) => {
    const response = await axiosInstance.get(`schedules/${id}`);
    return response.data;
  },
};