import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_SHIPPING_INFO,
} from "../constants/addToCart";

export const addtoCartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === newItem.id);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems?.map((i) =>
            i.id === existingItem.id ? newItem : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems?.filter(
          (product) => product.id !== action.payload
        ),
      };

    case SET_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
