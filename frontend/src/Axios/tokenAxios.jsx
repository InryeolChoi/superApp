import axios from "axios";
import Cookies from 'js-cookie';
import simpleAxios from './simpleAxios';

const tokenAxios = axios.create({
    baseURL: simpleAxios.defaults.baseURL,
    timeout: 5000, // 타임아웃을 5000ms로 설정 (5초)
    headers: simpleAxios.defaults.headers,
});

const getNewAccessToken = async () => {
    try {
        const response = await simpleAxios.post('/token/refresh/', 
            {refresh: localStorage.getItem('refresh_token') || Cookies.get('refresh')}
        );
        localStorage.setItem('access_token', response.data.access);
        Cookies.set('access', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('토큰 갱신 중 에러 발생:', error);
        throw error;
    }
};

tokenAxios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token') || Cookies.get('access');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

tokenAxios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await getNewAccessToken();
                tokenAxios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return tokenAxios(originalRequest);
            } catch (err) {
                console.error('재시도 중 에러 발생:', err);
                // 네비게이트 함수 호출을 위한 콜백을 사용하도록 설정
                if (originalRequest.onAuthFail) {
                    originalRequest.onAuthFail();
                }
            }
        }
        return Promise.reject(error);
    }
);

export default tokenAxios;