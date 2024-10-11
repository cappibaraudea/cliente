import { useNavigate } from "react-router-dom";
import { useTask } from "../context/tasksContext";
import { useState } from "react";
import { useAuth } from "../context/authContext";

import { LuMoreVertical } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { LuFileEdit } from "react-icons/lu";
import { LuAlarmClock } from "react-icons/lu";

export const TaskCard = ({ task, deleteTask, openModal }) => {
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();

  const { handleAttendeeFunction, getFeedFunction } = useTask();

  const resetDate = new Date(task.date + "T00:00:00").toLocaleDateString(
    "es-ES",
    {
      month: "short",
      day: "2-digit",
    }
  );

  const handleActive = () => {
    if (options) setOptions(false);
    if (task.address.length <= 15 && task.user.id == user.id) return;

    setActive(!active);
  };

  const handleAttend = async () => {
    const attend = {
      userName: user.name,
      userId: user.id,
      taskId: task.id,
    };

    await handleAttendeeFunction(attend);
    await getFeedFunction();
  };

  const addressTruncated =
    task.address.length >= 15
      ? `${task.address.slice(0, 14)}...`
      : task.address;

  return (
    <div
      className={`bg-white p-4 px-6 font-custom h-fit rounded-md flex flex-col w-full text-lg text-gray-600 relative cursor-pointer ${
        active ? "mb-16" : "mb-2"
      }`}
    >
      <div onClick={() => handleActive()}>
        <p className="text-xl text-black mb-2">{task.title} </p>

        <section className="flex flex-col gap-2">
          <div className="flex justify-between pr-4">
            <div className="flex gap-2 items-start">
              <img src="address-icon.svg" className="w-4 pt-[5px] " />
              <p className={`w-40 ${active ? "" : "truncate"} `}>
                {active ? task.address : addressTruncated}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <LuAlarmClock />
              <p>{task.hour}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <img src="date-icon.svg" className="w-4" />
            <p>{resetDate}</p>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex gap-2 items-center">
              <img
                src="perfil-photo.png"
                alt="foto de perfil"
                className="object-contain h-10"
              />
              <p>{task.user.name}</p>
            </div>

            <button
              className="flex flex-col items-center"
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
            >
              {active && <p className="text-sm text-gray-400">Asistentes</p>}
              <img
                src="attendees.png"
                alt=""
                className="w-14 object-contain pb-2"
              />
            </button>
          </div>
        </section>
      </div>

      {active && task.user.id !== user.id && (
        <section className="absolute border-[1px] border-green-500 w-full left-0 -bottom-14 bg-white flex h-18">
          <a
            className="flex gap-2 border-[1px] border-green-500 flex-1 p-4 text-lg"
            href={task.url}
            target="_blank"
          >
            <img src="whatsapp.svg" alt="" />
            <p className="text-green-600">Ir al chat</p>
          </a>

          <div
            className={`flex gap-2 border-[1px] border-green-500 flex-1 text-lg justify-center ${
              task.attendees.some((a) => a?.id === user.id)
                ? "bg-green-500 p-2"
                : "bg-white p-4"
            } `}
            onClick={() => handleAttend()}
          >
            <p
              className={`${
                task.attendees.some((a) => a?.id === user.id)
                  ? "text-sm text-center text-white w-16"
                  : "text-green-500"
              } `}
            >
              {task.attendees.some((a) => a?.id === user.id)
                ? "Asistencia confirmada"
                : "Asistiré"}
            </p>
          </div>
        </section>
      )}

      {task.user.id == user.id && (
        <div
          onClick={() => setOptions(!options)}
          className="absolute top-4 right-4 p-2"
        >
          <LuMoreVertical className=" text-green-500 text-2xl" />
        </div>
      )}

      {options && (
        <div className="border-[1px] border-black absolute top-4 right-4 bg-white">
          <span
            className="flex items-center gap-1 border-b-black border-[1px] cursor-pointer p-2"
            onClick={deleteTask}
          >
            <LuTrash2 />
            <p>Eliminar</p>
          </span>

          <span
            className="flex items-center gap-1 cursor-pointer p-2"
            onClick={() => navigate(`/taskForm/${task.id}`)}
          >
            <LuFileEdit />
            <p>Editar</p>
          </span>
        </div>
      )}
    </div>
  );
};
