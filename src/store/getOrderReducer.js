import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  CLEAR_ERROR,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAIL,
  CHANGE_ORDERSTATUS_REQUEST,
  CHANGE_ORDERSTATUS_SUCCESS,
  CHANGE_ORDERSTATUS_FAIL,
} from "../constants/getOrderConstants";

export const getOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case GET_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getOrderDetails = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderFeedback = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FEEDBACK_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case FEEDBACK_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderStatusChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ORDERSTATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_ORDERSTATUS_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case CHANGE_ORDERSTATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
