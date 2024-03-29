import { axiosInstance } from './index';

export const teacherApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
        `teachers/extended?pageCurrent=${page}&pageSize=${size}&pageTotal=0&${filter}`
    );
    return response.data;
  },

  createApi: async (data) => {
    const response = await axiosInstance.post('teachers', data);
    return response.data;
  },

  updateApi: async ({ id, ...data }) => {
    const response = await axiosInstance.put(`teachers/${id}`, data);
    return response.data;
  },

  removeApi: async (id) => {
    const response = await axiosInstance.delete(`teachers/${id}`);
    return response.data;
  },

  getByIdApi: async (id) => {
    const response = await axiosInstance.get(`teachers/${id}`);
    return response.data;
  },
};
