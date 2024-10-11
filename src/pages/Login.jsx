import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext.jsx";
import { useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import Button from "../components/Button.jsx";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: loginErrors, isAuth, isLoading } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    // console.log(values);
    await signIn(values);
  };

  useEffect(() => {
    if (isAuth) navigate(`/cliente/feed`, { replace: true });
  }, [isAuth]);

  if (isAuth && isLoading == false)
    return <Navigate to={"/cliente/feed"} replace />;

  return (
    <article className="bg-white w-full min-h-screen flex justify-center">
      <form
        className=" flex flex-col w-fit p-10 rounded-3xl h-fit font-custom py-36 shadow-lg"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(105, 227, 123, 0.5) 0%, #ffffff 20%)",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-3xl mb-5">Inicia sesión</p>
        <p className="text-lg mb-10">
          Inicia sesión con tu cuenta de Cappibara
        </p>
        {loginErrors &&
          loginErrors.map((error, i) => (
            <p
              className="bg-red-500 p-2 rounded-md text-white font-bold mb-2"
              key={i}
            >
              {error}
            </p>
          ))}

        <div className="flex flex-col gap-5 mb-10">
          <div>
            <label from="password" className="mb-3">
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="h-12 rounded-3xl w-full text-black border-input-gray-text border-2 pl-4 bg-input-gray"
              {...register("email", { required: "El correo es requerido" })}
              placeholder="Cappibara@example.com"
              autoFocus
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
              id="password"
              className="h-12 rounded-3xl w-full text-black border-input-gray-text border-2 pl-4 bg-input-gray"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
              placeholder="Introduce tu contraseña"
            />
            <ErrorMessage
              errors={errors}
              name={"password"}
              render={({ message }) => (
                <p className="text-red-500">{message}</p>
              )}
            />
          </div>
        </div>

        <Button buttonType={"submit"}>Inicia sesión</Button>

        <span className="mx-auto mt-4">
          ¿No tienes una cuenta?
          <Link to={"/cliente/register"} className="underline ml-2">
            Regístrate
          </Link>
        </span>
      </form>
    </article>
  );
}
export default Login;
