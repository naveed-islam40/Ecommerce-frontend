import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  ERROR_CLEAR,
} from "../constants/constants";

export const getProduct = (
  keyword = "",
  currentPage = 1,
  priceRange = [0, 200],
  category,
  rating = 0
) =>
  async function (dispatch) {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `${process.env.REACT_APP_BACKEND_URL}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `${process.env.REACT_APP_BACKEND_URL}/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&catagory=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);
      console.log(data);
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductData = (productId) =>
  async function (dispatch) {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST });

      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/${productId}`);

      dispatch({
        type: PRODUCT_DETAIL_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload: error.response.data.message || "An error occured",
      });
    }
  };

export const clearError = () =>
  async function (dispatch) {
    dispatch({ type: ERROR_CLEAR });
  };
