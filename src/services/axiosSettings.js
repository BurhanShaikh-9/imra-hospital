import React from 'react'
import Base from './base';
import axios from 'axios';
// import TokenService from './tokenService';

const AxiosSettings = () => {
    const { baseURL } = Base();
    // const { userToken } = TokenService();


    const axiosInstance = axios.create({
        url: baseURL,
        maxBodyLength: Infinity,
        // headers: {
        //     'Authorization': `Bearer ${userToken}`,
        //     'Content-Type': 'application/json'
        // },
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            // Fetch the token dynamically before sending the request
            // const newToken = await fetchToken();
            // config.headers['Authorization'] = `Bearer ${newToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            // Process successful responses
            return response;
        },
        (error) => {
            // Handle response error
            if (error.response.status === 401) {
                
                console.log('error in axios main');
            }
            return Promise.reject(error);
        }
    );
    return { axiosInstance }
}

export default AxiosSettings