import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import { productReducer, productDetailReducer } from "./productReducer";
import {
  SignleUserDetailsReducer,
  updateReducer,
  userReducer,
} from "./userReducer";
import { forgotPasswordReducer } from "./forgotPassword";
import { addtoCartReducer } from "../store/addToCart";
import { createOrderReducer } from "./createOrderReducer";
import {
  getOrderDetails,
  getOrderReducer,
  orderFeedback,
  orderStatusChangeReducer,
} from "./getOrderReducer";
import {
  AdminAllOrders,
  AdminProductsReducer,
} from "./getAllProductReducer_Admin";
import { createProductReducer } from "./createProductReducer";
import { deleteProductReducer } from "./deleteProduct";
import { productUpdateReducer } from "./updateProductReducer";
import { contactReducer } from "./contactUsReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: updateReducer,
  forgotPassword: forgotPasswordReducer,
  cart: addtoCartReducer,
  createOrder: createOrderReducer,
  getOrder: getOrderReducer,
  getOrderDetail: getOrderDetails,
  Feedback: orderFeedback,
  AdminProducts: AdminProductsReducer,
  AllOrders: AdminAllOrders,
  ProductCreation: createProductReducer,
  deleteProduct: deleteProductReducer,
  productUpdate: productUpdateReducer,
  orderStatus: orderStatusChangeReducer,
  createProduct: createProductReducer,
  SignleUserDetails: SignleUserDetailsReducer,
  contactUs: contactReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("addtocart")
      ? JSON.parse(localStorage.getItem("addtocart"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
  },
};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
