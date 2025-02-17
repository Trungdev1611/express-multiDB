import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"

const api = axios.create({
  baseURL: "https://localhost://6666",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
 async (config) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...")
    }
    return Promise.reject(error)
  }
)

const axiosInstance = {
  get: <T>(url: string, config?: AxiosRequestConfig) => api.get<T>(url, config),
  getQuery: <T>(url: string, params?: T, config: AxiosRequestConfig = {}) =>
    api.get(url, { params: params, ...config }),
  post: <T>(url: string, data?: T, config: AxiosRequestConfig = {}) =>
    api.post(url, data, { ...config }),
  put: <T>(url: string, data?: T, config: AxiosRequestConfig = {}) =>
    api.post(url, data, { ...config }),
  patch: <T>(url: string, data?: T, config?: AxiosRequestConfig) =>
    api.patch(url, data, { ...config }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, { ...config }),
}

export default axiosInstance
