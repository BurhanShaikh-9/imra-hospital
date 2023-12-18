import Base from './base'
import AxiosSettings from './axiosSettings';

export const UserService = () => {
    const { baseUrl } = Base();
    const { axiosInstance } = AxiosSettings()

    const getAllUser = () => {
        return axiosInstance.get(`${baseUrl}/all-user`);
    };    
    const getSingleUser = (id) => {
        return axiosInstance.get(`${baseUrl}/single-user/${id}`);
    };    

    return { getAllUser, getSingleUser}
}
