import axios from 'axios';


const BASE_URL = 'http://localhost:3000';


export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivateInstance = axios.create({
    baseURL: BASE_URL
});

axiosPrivateInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('jwt'));
    console.log('config', token.data)

    if (token) {
        config.headers.Authorization = `Bearer ${token.data.accessToken}`;
    }
    return config;
});


