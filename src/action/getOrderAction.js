import {
  CHANGE_ORDERSTATUS_FAIL,
  CHANGE_ORDERSTATUS_REQUEST,
  CHANGE_ORDERSTATUS_SUCCESS,
  CLEAR_ERROR,
  FEEDBACK_FAIL,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
} from "../constants/getOrderConstants";
import axios from "axios";

export const getOrder = () =>
  async function (dispatch) {
    try {
      dispatch({ type: GET_ORDER_REQUEST });

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/user`);

      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: data.orders,
      });
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: GET_ORDER_FAIL,
        payload: error.response?.data.message || "An error occured",
      });
    }
  };

export const getOrderDetails = (id) =>
  async function (dispatch) {
    try {
      dispatch({ type: ORDER_DETAIL_REQUEST });

      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/${id}`);

      dispatch({
        type: ORDER_DETAIL_SUCCESS,
        payload: data.order,
      });
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: ORDER_DETAIL_FAIL,
        payload: error.response?.data.message || "An error occured",
      });
    }
  };

export const orderFeedbackAction = (productId, comment, rating) =>
  async function (dispatch) {
    try {
      dispatch({ type: FEEDBACK_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const feedbackData = {
        productId,
        comment,
        rating,
      };

      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/review`, feedbackData, config);

      dispatch({
        type: FEEDBACK_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: FEEDBACK_FAIL,
        payload: error.response?.data.message || "An error occured",
      });
    }
  };

export const orderStatusChangeAction = (orderId, Orderstatus) =>
  async function (dispatch) {
    try {
     
      const status = {status: Orderstatus}

      console.log(status)

      dispatch({ type: CHANGE_ORDERSTATUS_REQUEST });

      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/order/update/${orderId}`, status);

      dispatch({
        type: CHANGE_ORDERSTATUS_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log("Error", error);
      dispatch({
        type: CHANGE_ORDERSTATUS_FAIL,
        payload: error.response?.data.message || "An error occured",
      });
    }
  };

export const clearError = () =>
  async function (dispatch) {
    dispatch({ type: ERROR_CLEAR });
  };
