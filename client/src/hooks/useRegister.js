import { useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;

  const server_register = async (name, password, backup_code) => {
    setIsLoading(true);
    setError(null);

    axios
      .post(`${baseURL}/auth/signup`, {
        userName: name,
        userPassword: password,
        userBackupCode: backup_code,
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

  return { isLoading, error, setError, server_register };
};
