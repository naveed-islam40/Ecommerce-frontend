import { ERROR_CLEAR } from "../constants/constants";
import {
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/updateProduct";

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
