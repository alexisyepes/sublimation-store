import {
  GET_QTY,
  ADDED_TO_CART,
  REMOVED_FROM_CART,
  EMPTY_OUT_CART,
  GET_CART,
} from "../actions/types";

const initialState = {
  cart: [],
  qty: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QTY:
      return {
        ...state,
      };

    case ADDED_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVED_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case EMPTY_OUT_CART:
      return {
        ...state,
        cart: [],
      };

    case GET_CART:
      return {
        ...state,
      };

    default:
      return state;
  }
}
