import axios from 'axios';
import useTokenStore from '@/store';
import { Order } from '@/types';
import { BASE_URL } from '@/utils/apiConfig';
const api = axios.create({
    baseURL:BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },

});
api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (data: {email:string; password: string }) =>
    api.post('/api/v1/users/login', data);

//api for google login for Admin
export const googleAuth = async (data: {email:string}) => api.post(`/api/v1/users/google`,data);


//api for google login for normal User
export const UsergoogleAuth = async (data: {email:string}) => api.post(`/api/v1/users/usergoogle`,data);
// export const getVideos = async () => api.get('/api/v1/videos/videos-list');
export const register = async (data: {fullName:string; username: string; email: string; password: string }) =>
    api.post('/api/v1/users/register', data);



//-------------->Orders<---------------
export const getVideos = async () => api.get('/api/v1/orders/orders-list');
export const getUserOrders = async () =>
  api.get('/api/v1/orders/user-orders');
console.log("All orders:",getVideos);
export const deleteVideo = async (id: string) =>api.delete(`/api/v1/orders/delete-Order/${id}`);

export const singleRate = async () =>
    api.get(`/api/v1/rates/getRates`);



export const updateRate = async (data: any) => {
  return api.put(`/api/v1/rates/updateRates`, data);
};

export const createVideo = async (data: FormData) => {
    console.log("data from front", data);
    return api.post('/api/v1/videos/addVideo', data); // No need to set headers
  }
  
export const updateVideo = async (orderId: string, updatedData:Order) =>
  api.patch(`/api/v1/orders/update-Order/${orderId}`, updatedData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
    
console.log("Updated data from server:",updateVideo);

    //------------------>Users<-----------------

export const getUsers = async () => api.get('/api/v1/users/users-list');
console.log("All Users:",getUsers );
// /single-Video/:videoId
// /update-Video/:videoId
export const createUser = async (data: FormData) => {
    console.log("data from front", data);
    return api.post('/api/v1/users/register', data); // No need to set headers
  }
export const deleteUser = async (id: string) =>api.delete(`/api/v1/users/delete-User/${id}`);






