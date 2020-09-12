import {
  GET_CART,
  INCREASE_QTY_IN_CART,
  DECREASE_QTY_IN_CART,
  ADDED_TO_CART,
  REMOVED_FROM_CART,
  EMPTY_OUT_CART,
  GET_SUBTOTAL_PRICE,
  STORE_IMG_FROM_PRODUCTS,
  REMOVED_IMAGE_FROM_STATE,
  EMPTY_OUT_IMAGES,
} from "./types";

export const getCart = (item) => (dispatch) => {
  dispatch({
    type: GET_CART,
    payload: [item],
  });
};

export const getSubTotalPrice = () => (dispatch) => {
  dispatch({
    type: GET_SUBTOTAL_PRICE,
  });
};

export const increaseQtyInCart = (_id) => (dispatch) => {
  dispatch({
    type: INCREASE_QTY_IN_CART,
    _id,
  });
};

export const decreaseQtyInCart = (_id) => (dispatch) => {
  dispatch({
    type: DECREASE_QTY_IN_CART,
    _id,
  });
};

export const addItemToCart = (item) => (dispatch) => {
  dispatch({
    type: ADDED_TO_CART,
    payload: item,
  });
};

export const emptyOutCart = () => (dispatch) => {
  dispatch({
    type: EMPTY_OUT_CART,
  });
};

export const emptyOutImages = () => (dispatch) => {
  dispatch({
    type: EMPTY_OUT_IMAGES,
  });
};

export const removeItemFromCart = (id) => (dispatch) => {
  dispatch({
    type: REMOVED_FROM_CART,
    id,
  });
};

export const removeImageFromState = (id) => (dispatch) => {
  dispatch({
    type: REMOVED_IMAGE_FROM_STATE,
    id,
  });
};

export const storeImgFromProducts = (payload) => (dispatch) => {
  dispatch({
    type: STORE_IMG_FROM_PRODUCTS,
    payload,
  });
};
