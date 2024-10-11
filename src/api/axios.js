import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend-28d1.onrender.com",
  withCredentials: true,
});
