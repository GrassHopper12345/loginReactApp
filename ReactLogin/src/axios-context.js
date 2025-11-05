import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const axiosContext = axios.create({
    baseURL: `${apiBaseURL}/api`
})

axiosContext.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosContext.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error;
    if (response) {
        if (response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    throw error;
})

export default axiosContext