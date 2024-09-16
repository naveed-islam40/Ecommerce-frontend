import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../constants/updateProduct";
import axios from "axios";

export const updateProductAction = (id, formData) =>
  async function (dispatch) {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const { data } = await axios.patch(
        `/api/admin/updateProduct/${id}`,
        formData
      );

      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
