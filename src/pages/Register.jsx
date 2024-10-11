import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext.jsx";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

function Register() {
  const { signup, errors: authErrors, isAuth, user, isLoading } = useAuth();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuth) navigation("/cliente/feed", { replace: true });
  }, [isAuth]);

  if (isAuth && isLoading == false)
    return <Navigate to={"/cliente/feed"} replace />;

  return (
    <article className="bg-white w-full min-h-screen flex justify-center">
      <form
        className="bg-white font-custom flex flex-col gap-2 w-fit p-10 rounded-3xl h-fit shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-3xl">Registro</p>
        <p className="text-lg mb-4">Empieza a socializar como un cappibara</p>

        {authErrors &&
          authErrors.map((error, i) => (
            <p
              className="bg-red-500 p-2 rounded-md text-white font-bold mb-2"
              key={i}
            >
              {error}
            </p>
          ))}
        <div className="flex flex-col gap-5 mb-5">
          <div>
            <label from="password" className="mb-3">
              Nombre
            </label>
            <input
              type="text"
              className="h-12 rounded-3xl w-full text-black border-input-gray-text border-2 pl-4 bg-input-gray"
              {...register("name", {
                required: "El nombre es requerido",
              })}
              placeholder="Cappibara"
              autoFocus
            />
            <ErrorMessage
              errors={errors}
              name={"userName"}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>
          <div>
            <label from="password" className="mb-3">
              Correo
            </label>
            <input
              type="email"
              className="h-12 rounded-3xl w-full text-black border-input-gray-text border-2 pl-4 bg-input-gray"
              {...register("email", { required: "El correo es requerido" })}
              placeholder="cappibara@example.com"
            />
            <ErrorMessage
              errors={errors}
              name={"email"}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>
          <div>
            <label from="password" className="mb-3">
              Contraseña
            </label>
            <input
              type="password"
              className="h-12 rounded-3xl w-full text-black border-input-gray-text border-2 pl-4 bg-input-gray"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
              placeholder="Crea tu contraseña"
            />
            <ErrorMessage
              errors={errors}
              name={"password"}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="mb-3">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="h-12 rounded-3xl w-full text-black border-input-gray-text border-2 pl-4 bg-input-gray"
              {...register("confirmPassword", {
                required: "Debes confirmar la contraseña",
                validate: (value) =>
                  value === getValues("password") ||
                  "Las contraseñas no coinciden",
              })}
              placeholder="Confirma tu contraseña"
            />
            <ErrorMessage
              errors={errors}
              name={"confirmPassword"}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>
        </div>
        <Button buttonType={"submit"}>Crear cuenta</Button>

        <span className="mx-auto mt-4">
          ¿Ya tienes tu cuenta?
          <Link to={"/cliente/login"} className="underline ml-2">
            Inicia sesión
          </Link>
        </span>
      </form>
    </article>
  );
}
export default Register;
