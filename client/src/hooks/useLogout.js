import { useAuthContext } from "./useAuthContext";
import { useStateContext } from "../contexts/StateContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const {
    setNewRound,
    setCurrScore,
    setCurrWinner,
    setCurrEasy,
    setCurrNormal,
    setCurrHard,
  } = useStateContext();

  const logout = () => {
    setNewRound(true);
    setCurrScore(0);
    setCurrWinner(false);
    setCurrEasy(0);
    setCurrNormal(0);
    setCurrHard(0);
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
