import axios from "axios";
import {
  CREATE_ORDER_CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from "../constants/createOrderConstants";

export const createOrder = (order) =>
  async function (dispatch, getState) {
    try {
      dispatch({
        type: CREATE_ORDER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/create/new", order, config);

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearError = () =>
  async function (dispatch) {
    dispatch({ type: CREATE_ORDER_CLEAR_ERRORS });
  };
