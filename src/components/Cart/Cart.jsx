import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartContainer from "../CartContainer/CartContainer";
import NoProduct from "../CartContainer/NoProduct";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCheckOut = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/signup");
    }
  };

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return <NoProduct />;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="hidden md:grid grid-cols-4 gap-4 mb-6 text-sm font-semibold text-gray-600 uppercase">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          <div className="space-y-6">
            {cartItems.map((details, index) => (
              <CartContainer key={index} details={details} />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Total Price</h2>
            <span className="text-2xl font-bold text-gray-800">${totalPrice}</span>
          </div>
          <div className="flex justify-center">
          <button
            onClick={handleCheckOut}
            className=" bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Proceed to Checkout
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}