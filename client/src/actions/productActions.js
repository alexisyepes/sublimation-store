import { GET_PRODUCTS, GET_PRODUCTS_CUSTOMIZED } from "./types";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  await axios.get("/all_products").then((products) =>
    dispatch({
      type: GET_PRODUCTS,
      payload: products,
    })
  );
};

export const getProductsCustomized = () => async (dispatch) => {
  await axios.get("/all_products_customized").then((products) =>
    dispatch({
      type: GET_PRODUCTS_CUSTOMIZED,
      products,
    })
  );
};
