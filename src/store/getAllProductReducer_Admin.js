import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CLEAR_ERRORS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
} from "../constants/getAllProduct_Admin";

export const AdminProductsReducer = (state = [], action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ADMIN_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const AdminAllOrders = (state = [], action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case ALL_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
