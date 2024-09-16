import {
  CONTACTUS_REQUEST,
  CONTACTUS_SUCCESS,
  CONTACTUS_FAIL,
} from "../constants/contactUsConstant";

export const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACTUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CONTACTUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case CONTACTUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
