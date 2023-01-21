import createDataContext from "./createDataContext";
import { toast } from "react-toastify";


const cartReducer = (state, action) => {
  const found = state.some(el => el.name === action.payload?.name)
  switch (action.type) {

    case "increase":
      if (!found) {
        return [...state, {...action.payload, quantity: 1}]
      }
      return state.map(el => el.name === action.payload?.name ? {...el, quantity: el.quantity + 1} : el)

    case "decrease":
      if (found) {
        if (state.find(el => el.name === action.payload?.name).quantity === 1) {
          return state.filter(el => el.name !== action.payload?.name)
        }

        return state.map(el => el.name === action.payload?.name ? {...el, quantity: el.quantity - 1} : el)
      }
      return state.filter(el => el.name !== action.payload?.name)

    case "clear":
      return state = []

    default:
      return state;
  }
};

const handleAddToCart = (dispatch) => {
  return async (cart) => {
    dispatch({ type: "increase", payload: cart });
    toast(`${cart?.name} Added to Cart`, { type: "success", autoClose: 500 });
  };
}

const handleDecreaseToCart = (dispatch) => {
  return async (cart) => {
    dispatch({ type: "decrease", payload: cart });
  };
}

const clearCart = (dispatch) => {
  return async () => {
    if (confirm("Clear Cart?")) {
      return dispatch({ type: "clear" });
    }
    return 
  };
}

export const { Context, Provider } = createDataContext(
  cartReducer,
  { handleAddToCart, handleDecreaseToCart, clearCart },
  []
);
