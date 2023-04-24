// eslint-disable-next-line prettier/prettier
import type { PostResponseType, PutResponseType } from '../types/commonTypes/commonTypes';
import type { ISpaceType, IEditSpaceById, ISpacesDataType } from '../types/spacesTypes';
import { axiosInstance } from './index';

export const spacesApi = {
  getSpacesList: async (page = 1, size = 100, filter = '') => {
    const response = await axiosInstance.get<ISpacesDataType>(
      `campaign/v1/spaces/page/filter?page=${page}&size=${size}&${filter}`
    );
    return response.data;
  },

  createSpace: async (space: ISpaceType) => {
    const response = await axiosInstance.post<PostResponseType>('campaign/v1/spaces', space);
    return response.data;
  },

  updateSpace: async ({ id, ...space }: IEditSpaceById) => {
    const response = await axiosInstance.put<PutResponseType>(`campaign/v1/spaces/${id}`, space);
    return response.data;
  },

  changeSpaceState: async ({ id, state }: Pick<IEditSpaceById, 'id' | 'state'>) => {
    const response = await axiosInstance.patch<IEditSpaceById>(`campaign/v1/spaces/${id}/state/${state}`);
    return response.data;
  },
};
