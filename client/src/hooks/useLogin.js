import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useStateContext } from "../contexts/StateContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;

  const server_login = async (name, password) => {
    setIsLoading(true);
    setError(null);

    axios
      .post(`${baseURL}/auth/login`, {
        userName: name,
        userPassword: password,
      })
      .then((response) => {
        if (response.data["success"]) {
          localStorage.setItem("token", JSON.stringify(response.data));
          dispatch({ type: "LOGIN", payload: response.data });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError(response.data["message"]);
        }
      });
  };

  return { isLoading, error, server_login };
};
