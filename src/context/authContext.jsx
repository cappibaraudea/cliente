import { createContext, useContext, useState, useEffect } from "react";
import { registerUser } from "../api/auth";
import { login, verifyToken, logout } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  async function verifyAuthentication() {
    const token = Cookies.get("token");
    if (!token) {
      setIsAuth(false);
      setIsLoading(false);
      return;
    }
    try {
      const verify = await verifyToken();

      if (!verify.data) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setIsAuth(true);
      setUser(verify.data);
    } catch (error) {
      setIsAuth(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    verifyAuthentication();
  }, []);

  const signup = async (user) => {
    try {
      const request = await registerUser(user);
      if (request.status === 200) {
        setUser(request.data);
        setIsLoading(false);
        setIsAuth(true);
      }
      //   console.log(request);
    } catch (error) {
      //   console.log(error);
      setErrors(error.response.data);
    }
  };

  const signIn = async (values) => {
    try {
      const request = await login(values);
      if (request.status === 200) {
        setIsAuth(true);
        setIsLoading(false);
        setUser(request.data);
      }
      // console.log(request);
    } catch (error) {
      // console.log(error);
      if (Array.isArray(error.response.data))
        return setErrors(error.response.data);
      setErrors([error.response.data.message]);
    }
  };

  const closeSession = async () => {
    try {
      if (Cookies.get("token")) {
        await logout();

        setIsAuth(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuth, signup, errors, signIn, isLoading, closeSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}
