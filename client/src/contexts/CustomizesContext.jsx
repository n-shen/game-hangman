import { createContext, useReducer } from "react";

export const CustomizesContext = createContext();

export const customizesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CTMS":
      return {
        cloud_ctms: action.payload,
      };
    case "CREATE_CTMS":
      return {
        cloud_ctms: [action.payload],
      };
    case "DELETE_CTMS":
      // console.log(state.cloud_ctms);
      return {
        cloud_ctms: state.cloud_ctms.filter(
          (t) => t._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const CustomizesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customizesReducer, {
    workouts: null,
  });

  return (
    <CustomizesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomizesContext.Provider>
  );
};
