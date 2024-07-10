import axios from "axios";
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
});

const getNewAccessToken = async () => {
    try {
        const response = await instance.post('/token/refresh/', 
            {refresh: localStorage.getItem('refresh_token'),}
        );
        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('토큰 갱신 중 에러 발생:', error);
        throw error;
    }
};

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await getNewAccessToken();
                instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (err) {
                console.error('재시도 중 에러 발생:', err);
                const navigate = useNavigate();
                navigate('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default instance;