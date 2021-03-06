import {
  ADDED_TO_CART,
  REMOVED_FROM_CART,
  EMPTY_OUT_CART,
  GET_CART,
  INCREASE_QTY_IN_CART,
  DECREASE_QTY_IN_CART,
  GET_SUBTOTAL_PRICE,
  STORE_IMG_FROM_PRODUCTS,
  REMOVED_IMAGE_FROM_STATE,
  EMPTY_OUT_IMAGES,
} from "../actions/types";

const initialState = {
  cart: [],
  images: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADDED_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case STORE_IMG_FROM_PRODUCTS:
      return {
        ...state,
        images: [...state.images, action.payload],
      };

    case INCREASE_QTY_IN_CART:
      const index = state.cart.findIndex((item) => item._id === action._id);
      const newArray = [...state.cart];
      newArray[index].qty = newArray[index].qty + 1;
      newArray[index].subTotal = newArray[index].qty * newArray[index].price;

      return {
        ...state,
        cart: newArray,
      };

    case DECREASE_QTY_IN_CART:
      const indexToDecrease = state.cart.findIndex(
        (item) => item._id === action._id
      );
      const newArrayToDecrease = [...state.cart];
      newArrayToDecrease[indexToDecrease].qty =
        newArrayToDecrease[indexToDecrease].qty - 1;
      newArrayToDecrease[indexToDecrease].subTotal =
        newArrayToDecrease[indexToDecrease].qty *
        newArrayToDecrease[indexToDecrease].price;

      return {
        ...state,
        cart: newArrayToDecrease,
      };

    case REMOVED_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.id),
      };

    case REMOVED_IMAGE_FROM_STATE:
      return {
        ...state,
        images: state.images.filter((item) => item._id !== action.id),
      };

    case EMPTY_OUT_CART:
      return {
        ...state,
        cart: [],
      };

    case EMPTY_OUT_IMAGES:
      return {
        ...state,
        images: [],
      };

    case GET_SUBTOTAL_PRICE:
      return {
        ...state,
        cart: [...state.cart],
      };

    case GET_CART:
      return {
        ...state,
      };
    default:
      return state;
  }
}
