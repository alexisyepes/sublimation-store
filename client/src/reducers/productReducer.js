import { GET_PRODUCTS, GET_PRODUCTS_CUSTOMIZED } from "../actions/types";

const initialState = {
  products: [],
  productsCustomized: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCTS_CUSTOMIZED:
      return {
        ...state,
        productsCustomized: action.products,
      };
    default:
      return { ...state };
  }
}
