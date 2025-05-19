import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de resposta com tipos
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    console.log("URL da requisição:", error.config?.url);
    console.log("Método:", error.config?.method);
    console.log("Base URL:", BASE_URL);

    if (error.response) {
      console.error("Erro na resposta:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
    } else {
      console.error("Erro na requisição:", error.message);
    }

    return Promise.reject(error);
  }
);

export const apiGet = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return api.get(url, config);
};

export const apiPost = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  return api.post(url, data, config);
};

export const apiPut = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  return api.put(url, data, config);
};

export const apiDelete = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return api.delete(url, config);
};

export default api;
