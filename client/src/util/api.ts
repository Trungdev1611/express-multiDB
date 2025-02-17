// api.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Tạo instance axios với cấu hình mặc định
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/admin/v1',
  timeout: 10000, // 10 giây timeout
});


axiosInstance.interceptors.request.use(
  (config) => {
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
      // Nếu lỗi xác thực (ví dụ 401), có thể tự động chuyển hướng logout hoặc thông báo
      if (error.response.status === 401) {
        // Ví dụ: localStorage.removeItem('token');
        // Redirect to login page...
      }
    }
    return Promise.reject(error);
  }
);
type PayloadData = object

const api = {
  // GET request không có query parameters
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => {
    return axiosInstance.get<T>(url, config);
  },

  // GET request với query parameters, params kiểu T
  getQuery: async <T, P>(
    url: string,
    params: P,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(url, { ...config, params });
  },

  // POST request, data kiểu T
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
  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(url, config);
  },
};

export default api;
