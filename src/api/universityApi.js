import {axiosInstance} from './index';
import axios from "axios";

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

    updateApi: async ({id, ...data}) => {
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

    createAdminApi: async (data) => {

        let response = {
            data: null
        };

        const registerResponse = await axios.post('https://university-scheduler.herokuapp.com/auth/register', {
            email: data.email,
            password: data.password
        })


        if (registerResponse.status === 200) {
            const loginResponse = await axios.post('https://university-scheduler.herokuapp.com/auth/login', {
                email: data.email,
                password: data.password
            })

            if (loginResponse.status === 200) {
                const meResponse = await axios.get('https://university-scheduler.herokuapp.com/auth/me', {
                    headers: {
                        Authorization: `Bearer ${loginResponse.data.token}`
                    }
                })
                if (meResponse.status === 200) {

                    const createResponse = await axiosInstance.post('universities', {
                        name: data?.name,
                        userId: meResponse?.data?.id,
                        code: data?.code
                    })
                    console.log(createResponse, 'GGG')
                    if (createResponse.status === 201) {
                        localStorage.setItem('UNIVERSITY_CREATE', 'SUCCESS')
                    }

                    response = createResponse
                } else {
                    response = meResponse
                }
            } else {
                response = loginResponse
            }


        } else {
            response = registerResponse
        }
        return response.data
    },
};
