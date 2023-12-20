import React from 'react';
import Base from './base';
import AxiosSettings from './axiosSettings';
import Cookies from 'js-cookie';
import TokenService from './tokenService';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const AuthService = () => {

    const navigate = useNavigate();
    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings();
    const { saveCookie, deleteCookie, deleteUserCookie, saveUserCookie } = TokenService();

    const postAdminLogin = (data) => {
        return axiosInstance.post(`${baseUrl}/login-hospital`, data);
    };

    const successLogin = (response, routeName, isDashboard) => {
        // console.log(routeName, 'resqssssssssssssssssssss');
        // console.log(response.Hospital, 'respppp');
        if (response.success != 'false') {
            console.log('workingggg');
            saveUserCookie(response.Hospital?._id)
            saveCookie(response.token)
            if (isDashboard && routeName) {
                navigate(`/${routeName}`)
            }
            else {
                navigate(ROUTES.DASHBOARD)
            }
        }
    };


    // const postAdminRegister = (data) => {
    //     return axiosInstance.post(`${baseUrl}/api-admin/register`, data);
    // };

    const userLogout = () => {
        console.log('cookie Deleted');
        deleteCookie();
        deleteUserCookie();
        navigate(ROUTES.LOGIN)
    }

    return {
        postAdminLogin,
        successLogin,
        userLogout
        // postAdminRegister,
        // successLogin,
    };
}

export default AuthService;