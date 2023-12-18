import React from 'react'
import AxiosSettings from './axiosSettings';
import Base from './base';

export const DoctorService = () => {

    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()
    const postAddDoctor = (data) =>{
        return axiosInstance.post(`${baseUrl}/create-doctor`, data);
    }
    const getAllDoctor = () =>{
        return axiosInstance.get(`${baseUrl}/all-doctor`);
    }
    const getSingleDoctor = (id) =>{
        return axiosInstance.get(`${baseUrl}/single-doctor/${id}`);
    }
    const patchUpdateDoctor = (id, data) =>{
        return axiosInstance.patch(`${baseUrl}/update-doctor/${id}`, data);
    }
    const deleteSingleDoctor = (id) =>{
        return axiosInstance.delete(`${baseUrl}/delete-doctor/${id}`);
    }

  return {postAddDoctor, getAllDoctor, getSingleDoctor, patchUpdateDoctor, deleteSingleDoctor}
}
