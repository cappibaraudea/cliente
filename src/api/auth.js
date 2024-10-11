import { axiosInstance } from "./axios.js";

export const login = async (data) => {
  const response = await axiosInstance.post(`/login`, data);
  return response;
};

export const registerUser = async (data) => {
  const response = await axiosInstance.post(`/register`, data);
  return response;
};

export const logout = async () => {
  const response = await axiosInstance.post("/logout");
  return response;
};

export const verifyToken = async (token) => {
  const response = await axiosInstance.get("/verifyAuth");
  return response;
};
