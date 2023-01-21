import useLoadData from "../hooks/useLoadData";
import createDataContext from "./createDataContext";

const menuReducer = (state, action) => {
  switch (action.type) {
    case "get":
      return action.payload;

    default:
      return state;
  }
};

const getAllMenu = (dispatch) => {
  const response = useLoadData("list-menu", 5, 1);
  return async () => {
    dispatch({ type: "get", payload: response });
  };
};

export const { Context, Provider } = createDataContext(
  menuReducer,
  { getAllMenu },
  []
);
