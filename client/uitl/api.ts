// api.ts
// import { showToastRef } from '@/context/ToastContext';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Tạo instance axios với cấu hình mặc định
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3002/',
  timeout: 10000, // 10 giây timeout
});


axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config:any) => {
    // Giả sử token được lưu trong localStorage
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Xử lý lỗi và các response chung
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    // Có thể xử lý lỗi ở đây (ví dụ: logout khi 401, 403,...)
    if (error.response) {
      console.log(`error`, error, )
    //   if(showToastRef) {
    //     console.log(`showToastRef`, showToastRef)
    //  // @ts-expect-error("key is not exist")
    //     // showToastRef(error.response?.data?.msg || "Something wrong happened", `error`);
    //   }
      // Nếu lỗi xác thực (ví dụ 401), có thể tự động chuyển hướng logout hoặc thông báo
      if (error.response.status === 401 || error?.response?.data?.message ===  "Invalid or expired token") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error);
  }
);
type PayloadData = object

const api = {

  get: async(
    url: string,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance.get(url, config);
  },

  getQuery: async(
    url: string,
    params?: PayloadData,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance.get(url, { ...config, params });
  },

  post: async <T>(
    url: string,
    data: PayloadData,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(url, data, config);
  },

  // PUT request, data kiểu T
  put: async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(url, data, config);
  },

  // DELETE request
  delete: async <T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(url, {
      ...config,
      data, // Thêm data vào config
    });
  },
};

export default api;