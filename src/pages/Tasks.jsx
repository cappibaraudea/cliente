import { useEffect } from "react";
import { useTask } from "../context/tasksContext";
import { TaskCard } from "../components/TaskCard";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { tasks, getTasksFunction } = useTask();

  useEffect(() => {
    getTasksFunction();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="p-4 flex flex-col gap-4 bg-zinc-400 h-screen">
      {tasks.length == 0 && (
        <p className="text-black font-bold">No hay tareas</p>
      )}
      <section className="flex gap-3 flex-wrap">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </section>
      <button
        className="bg-green-700 text-white font-bold rounded-md p-2 w-fit mx-auto mt-12"
        onClick={() => navigate("/cliente/add-task")}
      >
        Agregar tarea
      </button>
    </div>
  );
};

export default Tasks;
