import React from 'react'
import Base from './base'
import axios from 'axios';
import AxiosSettings from './axiosSettings';

export const AdminService = () => {
    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()

    const getSingleAdmin = (id) => {
        return axiosInstance.get(`${baseUrl}/single-admin/${id}`);
    };    

    const getAllAdmin = () => {
        return axiosInstance.get(`${baseUrl}/all-admin`);
    };    
    const postAdmin = (data) => {
        return axiosInstance.post(`${baseUrl}/create-superadmin`, data);
    };
    const patchAdminToggle = (id) => {
        return axiosInstance.patch(`${baseUrl}/toggle-active-status/${id}`);
    };
    const patchAdmin = (data, id) => {
        return axiosInstance.patch(`${baseUrl}/admin-update/${id}`, data);
    };
    // const getSingleAdmin = (id) => {
    //     return axiosInstance.get(`${baseUrl}/api-admin/management/single-admin/${id}`);
    // };
    // const updateAdmin = (data, id) => {
    //     return axiosInstance.patch(`${baseUrl}/api-admin/management/update-admin/${id}`, data);
    // };
    // const getDeleteAdmin = (id) => {
    //     return axiosInstance.delete(`${baseUrl}/api-admin/management/delete-admin/${id}`);
    // };
    // const patchActivityAdmin = (id) => {
    //     return axiosInstance.patch(`${baseUrl}/api-admin/management/inactive-admin/${id}`);
    // };
    // const getTopicsPaginated = (funcPage, funcLimit) => {
    //     return axiosInstance.get(`${baseUrl}/api-admin/topic/gettopic`, {
    //         params: {
    //             page: funcPage,
    //             limit: funcLimit,
    //         },
    //     });
    // };

  

    return { getSingleAdmin, postAdmin, getAllAdmin, patchAdminToggle, patchAdmin }
}
