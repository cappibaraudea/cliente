import { createContext, useContext, useEffect, useState } from "react";
import {
  getTasks,
  newTask,
  getTask,
  deleteTask,
  editTask,
  getFeed,
  attend,
} from "../api/task";
import { useAuth } from "./authContext";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within AuthProvider");
  return context;
};

export const TasksProvider = ({ children }) => {
  const { isAuth } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [feed, setFeed] = useState([]);

  const getTasksFunction = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks.data);
      //   console.log(`Las tareas son: ${tasks}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskFunction = async (id) => {
    try {
      const task = await getTask(id);
      return task.data;
      //   console.log(`Las tareas son: ${tasks}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeedFunction = async () => {
    try {
      const feed = await getFeed();
      setFeed(feed.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newTaskFunction = async (task) => {
    try {
      const data = await newTask(task);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskFunction = async (id) => {
    try {
      const data = await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editTaskFunction = async (id, task) => {
    try {
      const data = await editTask(id, task);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendeeFunction = async (body) => {
    try {
      const data = await attend(body);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuth) return;
    getTasksFunction();
    getFeedFunction();
  }, [isAuth]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        feed,
        newTaskFunction,
        getTasksFunction,
        getTaskFunction,
        deleteTaskFunction,
        editTaskFunction,
        getFeedFunction,
        handleAttendeeFunction,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
