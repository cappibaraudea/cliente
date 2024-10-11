import { axiosInstance } from "./axios.js";

export const getTasks = async () => {
  const data = await axiosInstance.get("/tasks");
  return data;
};

export const getTask = async (id) => {
  const data = await axiosInstance.get(`/task/${id}`);
  return data;
};

export const newTask = async (task) => {
  const data = await axiosInstance.post("/task", task);
  return data;
};

export const deleteTask = async (id) => {
  const data = await axiosInstance.delete(`/task/${id}`);
  return data;
};

export const editTask = async (id, task) => {
  const data = await axiosInstance.put(`/task/${id}`, task);
  return data;
};

export const getFeed = async () => {
  const data = await axiosInstance.get(`/feed`);
  return data;
};

export const attend = async (body) => {
  const data = await axiosInstance.post(`/attend`, body);
  return data;
};
