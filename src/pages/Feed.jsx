import { Link } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import { useTask } from "../context/tasksContext";
import { useEffect, useState } from "react";

import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../context/authContext";

import FilterButton from "../components/FilterButton";

import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { feed, getFeedFunction, deleteTaskFunction } = useTask();

  const { closeSession } = useAuth();

  const [filter, setFilter] = useState("parches");
  const [parchesRender, setParchesRender] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [modal, setModal] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getFeedFunction();
  }, []);

  const logOut = () => {
    closeSession();
    navigate("/cliente");
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTaskFunction(taskId);
    await getFeedFunction();
  };

  useEffect(() => {
    switch (filter) {
      case "parches":
        setParchesRender(
          feed.filter(
            (parche) =>
              parche.user.id !== user.id &&
              !parche.attendees.some((attendee) => attendee.id === user.id)
          )
        );
        break;
      case "mis-parches":
        setParchesRender(feed.filter((parche) => parche.user.id == user.id));
        break;
      case "asistiré":
        setParchesRender(
          feed.filter((parche) =>
            parche.attendees.some((attendee) => attendee.id === user.id)
          )
        );
        break;
      default:
        setParchesRender([]);
    }
  }, [filter, feed]);

  const openModal = (taskId) => {
    setAttendees(feed.filter((parche) => parche.id == taskId)[0].attendees);
    setModal(!modal);
  };

  return (
    <div className="relative">
      <div className="sticky top-0 flex-1">
        <div className="flex flex-col w-screen rounded-t-3xl">
          <div className="bg-green-button p-5 flex justify-between items-center">
            <p className="font-logo text-4xl text-white">Cappibara</p>
            <LuLogOut
              onClick={() => logOut()}
              className="text-white text-3xl cursor-pointer absolute top-6 right-8"
            />
          </div>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 h-[2.5px]"></span>
        </div>
        <div className="px-4 my-4">
          <Link to={"/cliente/add-task"} className="border-gradient-3">
            <button
              className="font-sans w-full text-sm font-light text-left"
              to={"/cliente/login"}
            >
              <p>Publica tu parche...</p>
            </button>
          </Link>

          <nav className="flex gap-3 justify-center mt-2">
            <FilterButton
              name={"Parches"}
              active={filter == "parches"}
              onClick={() => setFilter("parches")}
            />
            <FilterButton
              name={"Mis parches"}
              active={filter == "mis-parches"}
              onClick={() => setFilter("mis-parches")}
            />
            <FilterButton
              name={"Asistiré"}
              active={filter == "asistiré"}
              onClick={() => setFilter("asistiré")}
            />
          </nav>
        </div>

        <section className="overflow-scroll max-h-[620px] min-h-[600px] px-2">
          {parchesRender.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              deleteTask={() => handleDeleteTask(task.id)}
              openModal={() => openModal(task.id)}
            />
          ))}
          {parchesRender.length == 0 && (
            <p className="text-gray-400 text-center">
              No hay publicaciones en el feed
            </p>
          )}
        </section>
      </div>

      {modal && (
        <div
          className="bg-black/60 absolute w-full h-screen top-0 left-0 cursor-pointer flex justify-center items-center"
          onClick={() => setModal(false)}
        >
          <div className="bg-white w-2/3 p-4 flex flex-col gap-2 rounded-md">
            <p className="text-xl mb-3 font-bold">Asistentes:</p>
            {attendees.map((a) => (
              <div className="flex gap-2 items-center" key={a.id}>
                <img
                  src="perfil-photo.png"
                  alt="foto de perfil"
                  className="object-contain h-10"
                />
                <p>{a.name}</p>
              </div>
            ))}
            <p className="text-center">
              {attendees.length > 0 ? " " : "No hay asistentes aún"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
