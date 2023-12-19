import React from 'react'
import AxiosSettings from './axiosSettings';
import Base from './base';

export const ReceptionService = () => {

    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()
    const postAddReceptionist = (data) =>{
        return axiosInstance.post(`${baseUrl}/create-reception`, data);
    }
    const getAllReceptionist = () =>{
        return axiosInstance.get(`${baseUrl}/all-receptions`);
    }
    const getSingleReceptionist = (id) =>{
        return axiosInstance.get(`${baseUrl}/single-reception/${id}`);
    }
    const patchReceptionist = (id, data) =>{
        return axiosInstance.patch(`${baseUrl}/recption-update/${id}`, data);
    }
    const deleteSingleReceptionist = (id) =>{
        return axiosInstance.delete(`${baseUrl}/delete-receptions/${id}`);
    }

  return {postAddReceptionist, getAllReceptionist, getSingleReceptionist, patchReceptionist, deleteSingleReceptionist}
}
