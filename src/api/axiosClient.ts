import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL =
  process.env.BASE_URL ?? "https://backend-homestock.onrender.com/api/v1";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor que añade el token SOLO si no es /auth/refresh ni /auth/login
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      // No adjuntar el token si es el endpoint de refresh o login
      const skipAuth =
        config.url?.includes("/auth/refresh") || config.url?.includes("/auth/login");

      if (!skipAuth) {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // Ignorar errores de lectura del AsyncStorage
    }

    return config;
  },
  (error) => Promise.reject(error)
);
