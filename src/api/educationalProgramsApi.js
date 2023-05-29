import { axiosInstance } from './index';

export const educationalProgramsApi = {
  getAlLApi: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get(
      `educational-programs?pageCurrent=${page}&pageSize=${size}&pageTotal=0&${filter}`
    );
    return response.data;
  },

  createApi: async (data) => {
    const response = await axiosInstance.post('educational-programs', data);
    return response.data;
  },

  updateApi: async (data) => {
    const response = await axiosInstance.put(`educational-programs/${data?.id}`, data);
    return response.data;
  },

  removeApi: async (id) => {
    const response = await axiosInstance.delete(`educational-programs/${id}`);
    return response.data;
  },

  getByIdApi: async (id) => {
    const response = await axiosInstance.get(`educational-programs/${id}`);
    return response.data;
  },
};
