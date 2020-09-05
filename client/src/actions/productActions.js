import { GET_PRODUCTS } from "./types";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  await axios.get("/all_products").then((products) =>
    dispatch({
      type: GET_PRODUCTS,
      payload: products,
    })
  );
};
