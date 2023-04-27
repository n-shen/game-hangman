import { useContext } from "react";
import { CustomizesContext } from "../contexts/CustomizesContext";

export const useCustomizesContext = () => {
  return useContext(CustomizesContext);
};
