import {
  GET_CART,
  ADDED_TO_CART,
  REMOVED_FROM_CART,
  EMPTY_OUT_CART,
} from "./types";

export const getCart = (item) => (dispatch) => {
  dispatch({
    type: GET_CART,
    payload: [item],
  });
};

export const addItemToCart = (item) => (dispatch) => {
  dispatch({
    type: ADDED_TO_CART,
    payload: {
      item,
    },
  });
};

export const emptyOutCart = () => (dispatch) => {
  dispatch({
    type: EMPTY_OUT_CART,
  });
};

export const removeItemFromCart = (id) => (dispatch) => {
  dispatch({
    type: REMOVED_FROM_CART,
    payload: {
      id,
    },
  });
};

// export const getQty = () => (dispatch) => {
//   dispatch({
//     type: GET_QTY,
//   });
// };
