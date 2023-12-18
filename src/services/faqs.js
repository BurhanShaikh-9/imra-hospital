import React from 'react'
import AxiosSettings from './axiosSettings';
import Base from './base';

export const FaqService = () => {

    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()
   
    const getFaq = () =>{
        return axiosInstance.get(`${baseUrl}/get-faq`);
    }
    const postFaq = (data) =>{
        return axiosInstance.post(`${baseUrl}/post-faq`, data);
    }
    const deleteFaq = (id) =>{
        return axiosInstance.delete(`${baseUrl}/delete-faq/${id}`, );
    }
   
  return {getFaq, postFaq, deleteFaq}
}
