import {
  CLEAR_ERRORS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
} from "../constants/createProduct";
import axios from "axios";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    const { data } = await axios.post("/api/admin/createProduct", formData);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error", error);
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error && error.response.data.message,
    });
  }
};

export const clearError = () =>
  async function (dispatch) {
    dispatch({ type: CLEAR_ERRORS });
  };
