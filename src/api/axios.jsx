import axios from 'axios';
// import { getUserDataFromLocalStorage } from './user';

// const BASE_URL = 'http://localhost:5173';
const BASE_URL = 'https://api.escuelajs.co/api/v1/auth';

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

