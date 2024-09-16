import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ERROR_CLEAR,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  PASSWORD_UPDATE_RESET,
  FETCH_USERDETAILS_REQUEST,
  FETCH_USERDETAILS_SUCCESS,
  FETCH_USERDETAILS_FAIL,
} from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
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

export const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_PROFILE_SUCCESS:
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
        error: null,
      };
    case UPDATE_PROFILE_FAIL:
    case PASSWORD_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case PASSWORD_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const SignleUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERDETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USERDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_USERDETAILS_FAIL:
      return {
        ...state,
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
