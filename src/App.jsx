import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import WebFont from "webfontloader";
import Footer from "./components/Footer/Footer";
import Page1 from "./pages/Page1/Page1";
import MetaData from "./components/MetaData";
import GetProductDatail from "./components/getProductDetail/GetProductDatail";
import Products from "./components/Products/Products";
import Search from "./components/Products/Search";
import LoginSignup from "./components/Login-Signup/Login-Signup";
import store from "./store/store";
import { loadUser } from "./action/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/Header/UserOptions";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Cart from "./components/Cart/Cart";
import ShippingInfo from "./components/ShippingInfo/ShippingInfo";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import Payment from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import PlacedOrder from "./components/PlacedOrder/PlacedOrder";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import FeedBack from "./components/FeedBack/FeedBack";
import FeedBackSubmit from "./components/FeedBackSubmit/FeedBackSubmit";
import DashBoard from "./components/DashBoard/DashBoard";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import AdminAllOrders from "./components/AdminAllOrders/AdminAllOrders";
import AdminAllUsers from "./components/AdminAllUsers/AdminAllUsers";
import UserDetails from "./components/AdminAllUsers/UserDetails";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import DeleteSuccess from "./components/DeleteSuccess/DeleteSuccess";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import UpdateOrderStatus from "./components/UpdateOrderStatus/UpdateOrderStatus";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactUs from "./components/ContactUs/ContactUs";
import ProfessionalSignUp from "./components/signup/Signup";

const stripeApiKey =
  "pk_test_51OxS7lHpkdGlyPOh2nmwBNaoUVYIwAxSYdEvbbvVBkd1IQvsPjPnCQkHmCdcAtNNMgP0AGKTkaMBfk9kBkNFxAbF00xOROjAQG";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "sans-serif"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <MetaData title="E-COMMERCE" />
      <Header />
      {isAuthenticated ? <UserOptions user={user} /> : null}
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/product/:id" element={<GetProductDatail />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/signin" element={<LoginSignup />} />
        <Route path="/signup" element={<ProfessionalSignUp />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/me/update"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <PrivateRoute>
              <ShippingInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/confirm/order"
          element={
            <PrivateRoute>
              <ConfirmOrder />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/order/success"
          element={
            <PrivateRoute>
              <PlaceOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/me"
          element={
            <PrivateRoute>
              <PlacedOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/details/:orderid"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback/:productId"
          element={
            <PrivateRoute>
              <FeedBack />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedback/submit/:id"
          element={
            <PrivateRoute>
              <FeedBackSubmit />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute isAdminRoute={true}>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <PrivateRoute isAdminRoute={true}>
              <AdminProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <PrivateRoute isAdminRoute={true}>
              <AdminAllOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute isAdminRoute={true}>
              <AdminAllUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/create/product"
          element={
            <PrivateRoute isAdminRoute={true}>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete/admin/:id"
          element={
            <PrivateRoute isAdminRoute={true}>
              <DeleteProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete/success/:id"
          element={
            <PrivateRoute isAdminRoute={true}>
              <DeleteSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/admin/:updateId"
          element={
            <PrivateRoute isAdminRoute={true}>
              <UpdateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/orderStatus/:orderId"
          element={
            <PrivateRoute isAdminRoute={true}>
              <UpdateOrderStatus />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/details/:userId"
          element={
            <PrivateRoute isAdminRoute={true}>
              <UserDetails />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
