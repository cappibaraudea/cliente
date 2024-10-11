import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import { useTask } from "../context/tasksContext.jsx";
import { useAuth } from "../context/authContext.jsx";
import { Navigate } from "react-router-dom";

export const TaskForm = () => {
  const { newTaskFunction, getTaskFunction, editTaskFunction } = useTask();

  const { user, isLoading } = useAuth();

  const { id } = useParams();

  const [taskUserId, setTaskUserId] = useState("");

  const [hour, setHour] = useState("00:00");

  // const [dateValue, setDateValue] = useState("");

  const navigate = useNavigate();

  const getTask = async (id) => {
    try {
      const task = await getTaskFunction(id);
      setTaskUserId(task.user.id);
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("date", task.date);
      setValue("address", task.address);
      setValue("hour", task.hour);
      setValue("url", task.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getTask(id);
    }
    if (isLoading == false && user.id !== taskUserId && taskUserId !== "") {
      console.log("se cumplen las condiciones");
    }
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    // values.date = dateValue;
    if (id) {
      await editTaskFunction(id, values);
      navigate("/feed");
      return;
    }

    await newTaskFunction(values);
    navigate("/feed");
  };

  if (isLoading == false && user.id !== taskUserId && taskUserId !== "") {
    return <Navigate to={"/feed"} replace />;
  }

  return (
    <form
      className="bg-white flex flex-col gap-4 w-96 rounded-3xl h-fit overflow-hidden font-custom pb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <div className="bg-green-button p-5">
          <p className="font-logo text-4xl text-white">Cappibara</p>
        </div>
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 h-[2.5px]"></span>
      </div>

      <article className="mx-5 flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="title">Título del parche</label>
          <input
            type="text"
            id="title"
            maxLength={20}
            className="h-12 rounded-md min-w-80 text-black pl-3 bg-input-gray border-input-gray-text border-2"
            {...register("title", {
              required: "El título es requerido",
            })}
            placeholder="Escribe el título de tu parche"
            autoFocus
          />
          <ErrorMessage
            errors={errors}
            name={"title"}
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="address">Dirección del parche</label>
          <input
            type="text"
            id="address"
            className="h-12 rounded-md min-w-80 text-black pl-3 bg-input-gray border-input-gray-text border-2"
            {...register("address", { required: "Address is required" })}
            placeholder="Escribe la dirección del parche"
          />
          <ErrorMessage
            errors={errors}
            name={"address"}
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Descripción del parche</label>
          <input
            type="text"
            id="description"
            className="h-12 rounded-md min-w-80 text-black pl-3 bg-input-gray border-input-gray-text border-2"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Escribe una corta descripción..."
          />
          <ErrorMessage
            errors={errors}
            name={"description"}
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date">Feha del parche</label>
          <input
            type="date"
            id="date"
            className="h-12 rounded-md min-w-80 text-black pl-3 bg-input-gray border-input-gray-text border-2"
            {...register("date", { required: "Date is required" })}
          />
          <ErrorMessage
            errors={errors}
            name={"date"}
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="hour">Hora del parche</label>
          <input
            type="time"
            id="hour"
            className="h-12 rounded-md min-w-80 text-black pl-3 bg-input-gray border-input-gray-text border-2"
            {...register("hour", { required: "La hora es requerida" })}
            defaultValue={hour}
          />
          <ErrorMessage
            errors={errors}
            name={"hour"}
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="url">URL chat</label>
          <input
            type="text"
            id="url"
            className="h-12 rounded-md min-w-80 text-black pl-3 bg-input-gray border-input-gray-text border-2"
            {...register("url", { required: "Url is required" })}
            placeholder="Escribe la URL al chat de tu parche"
          />
          <ErrorMessage
            errors={errors}
            name={"url"}
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>
      </article>

      <Button buttonType={"submit"}>{id ? "Editar" : "Publicar"} </Button>
    </form>
  );
};
