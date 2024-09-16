import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_SHIPPING_INFO,
} from "../constants/addToCart";

// Add to Cart password
export const addToCart = (id, quantity) =>
  async function (dispatch, getState) {
    try {
      const { data } = await axios.get(`/api/product/${id}`);

      dispatch({
        type: ADD_TO_CART,
        payload: {
          id: data.product._id,
          name: data.product.name,
          price: data.product.price,
          image: data.product.images[0].url,
          stock: data.product.stock,
          quantity,
        },
      });

      localStorage.setItem(
        "addtocart",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

export const removeFromCart = (productId) =>
  async function (dispatch, getState) {
    try {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: productId,
      });

      localStorage.setItem(
        "addtocart",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

export const saveShippingInfo = ({
  city,
  phoneNo,
  streetNo,
  pincode,
  state,
  selectedCountry,
}) =>
  async function (dispatch, getState) {
    try {
      dispatch({
        type: SET_SHIPPING_INFO,
        payload: {
          city,
          phoneNo,
          streetNo,
          pincode,
          state,
          selectedCountry,
        },
      });

      localStorage.setItem(
        "shippingInfo",
        JSON.stringify(getState().cart.shippingInfo)
      );
    } catch (error) {
      console.log("error", error);
    }
  };
