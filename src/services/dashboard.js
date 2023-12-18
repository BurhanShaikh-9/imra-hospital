import React from 'react'
import AxiosSettings from './axiosSettings';
import Base from './base';

export const DashboardService = () => {

    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()
   
    const getDashboardData = () =>{
        return axiosInstance.get(`${baseUrl}/dishboard`);
    }
   
  return {getDashboardData}
}
