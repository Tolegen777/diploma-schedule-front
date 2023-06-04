import {axiosInstance} from './index';
import {formatDateWithTime} from "../utils/formatDateWithTime";

export const scheduleApi = {
    getAlLApi: async (filter = []) => {
        const response = await axiosInstance.post(`schedules/extended`, filter);

        let newData = []

        if (response.data?.length > 0) {
            const array = []
            newData = response.data.map((item) => {
                if (array.includes(`${formatDateWithTime(item?.startTime)}_${item.week}_0`)) {
                    const count = array.filter(elem => elem.replace(/_\d+$/, "") === `${formatDateWithTime(item?.startTime)}_${item.week}`).length;
                    array.push(`${formatDateWithTime(item?.startTime)}_${item.week}_${count}`)
                    return {
                        ...item,
                        itemIndex: String(count)
                    }
                } else {
                    array.push(`${formatDateWithTime(item?.startTime)}_${item.week}_0`)
                    return {
                        ...item,
                        itemIndex: `0`
                    }
                }


            })
        }

        return newData;
    },

    createApi: async (data) => {
        const response = await axiosInstance.post('schedules', data);
        return response.data;
    },

    updateApi: async ({id, ...data}) => {
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
