import {
  CONTACTUS_REQUEST,
  CONTACTUS_SUCCESS,
  CONTACTUS_FAIL,
} from "../constants/contactUsConstant";
import axios from "axios";

export const contactUsAction = (email, message) =>
  async function (dispatch, getState) {
    try {
      dispatch({
        type: CONTACTUS_REQUEST,
      });
      const userData = { email, message };
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact/page`, userData, config);

      dispatch({
        type: CONTACTUS_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CONTACTUS_FAIL,
        payload: error?.response.data.message,
      });
    }
  };
