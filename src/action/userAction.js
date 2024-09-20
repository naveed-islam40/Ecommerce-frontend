import axios from "axios";
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
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  ERROR_CLEAR,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FETCH_USERDETAILS_REQUEST,
  FETCH_USERDETAILS_SUCCESS,
  FETCH_USERDETAILS_FAIL,
} from "../constants/userConstant";

// Login User
export const getUser = (email, password) =>
  async function (dispatch) {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        { email, password },
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// Register USer
export const registerUser = (userData) =>
  async function (dispatch) {
    console.log(userData);
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, userData, config);

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      
    } catch (error) {
      console.log("Register Error", error);
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// LOAD USer
export const loadUser = () =>
  async function (dispatch) {
    try {
      dispatch({ type: LOAD_USER_REQUEST });

      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/me`);

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// logout
export const logout = () =>
  async function (dispatch) {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`);

      dispatch({
        type: LOGOUT_SUCCESS,
      });

      localStorage.removeItem("user");
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// Update USer
export const updateUser = (userData) =>
  async function (dispatch) {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/me/updatedetails`,
        userData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log("Register Error", error);
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// Update password
export const updatePassword = (password) =>
  async function (dispatch) {
    try {
      dispatch({ type: PASSWORD_UPDATE_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/me/updatepassword`,
        password,
        config
      );

      dispatch({
        type: PASSWORD_UPDATE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log("Register Error", error);
      dispatch({
        type: PASSWORD_UPDATE_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// Forgot password
export const forgotPassword = (email) =>
  async function (dispatch) {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/password/reset`, email, config);

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// Reset password
export const resetPassword = (token, passwords) =>
  async function (dispatch) {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/password/reset/${token}`,
        passwords,
        config
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log(error, "Error");
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

// fetch Single user
export const fetchSingleUser = (userId) =>
  async function (dispatch) {
    try {
      dispatch({ type: FETCH_USERDETAILS_REQUEST });

      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/user/${userId}`);

      dispatch({
        type: FETCH_USERDETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error, "Error");
      dispatch({
        type: FETCH_USERDETAILS_FAIL,
        payload: error.response.data.message || "An error occur",
      });
    }
  };

export const clearError = () =>
  async function (dispatch) {
    dispatch({ type: ERROR_CLEAR });
  };
