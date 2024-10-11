import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuth, isLoading, closeSession } = useAuth();

  const navigate = useNavigate();

  const cerrarSesion = async () => {
    console.log("click");
    const response = await closeSession();
    console.log(response);
  };
  return (
    <nav className="flex justify-between bg-slate-500 font-bold text-white p-3 px-6 items-center">
      <Link to={"/"}>
        <h1>Administrador de tareas</h1>
      </Link>

      <ul className="flex gap-3 items-center">
        {isAuth && isLoading == false && (
          <>
            <li>
              <Link to={"/tasks"}>Tareas</Link>
            </li>
            <li>
              <Link to={"/perfil"}>Perfil</Link>
            </li>
            <Button
              color={"bg-red-500"}
              buttonType={"button"}
              children={"Cerrar sesión"}
              onClick={() => cerrarSesion()}
            />
          </>
        )}
        {!isAuth && !isLoading && (
          <Button
            color={"bg-green-500"}
            buttonType={"button"}
            children={"Iniciar sesión"}
            onClick={() => navigate("/login")}
          />
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
