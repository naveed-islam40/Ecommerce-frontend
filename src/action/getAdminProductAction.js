import axios from "axios";
import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_SUCCESS,
} from "../constants/getAllProduct_Admin";

export const fetchProductsAndFilterByAdmin = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADMIN_PRODUCT_REQUEST,
      });
      const { data } = await axios.get("/api/products/admin");

      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.adminProducts,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const AdminAllOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ALL_ORDERS_REQUEST,
      });
      const { data } = await axios.post("/api/order/All");

      console.log(data)

      dispatch({
        type: ALL_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
