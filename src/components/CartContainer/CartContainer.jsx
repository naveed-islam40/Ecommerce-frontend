import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../action/addToCartAction.js";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify.js";

export default function CartContainer({ details }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(details.quantity);

  useEffect(() => {
    setOrder(details.quantity);
  }, [details.quantity]);

  useEffect(() => {
    dispatch(addToCart(details.id, order));
  }, [order, dispatch, details.id]);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(details.id));
    toast.success("Item removed from cart successfully!", toastify);
  };

  const decreaseQuantity = () => {
    if (order > 1) setOrder(order - 1);
  };

  const increaseQuantity = () => {
    if (order < details.stock) setOrder(order + 1);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-md border-b">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex-shrink-0 w-full sm:w-1/4 mb-4 sm:mb-0 flex justify-center">
          <img 
            src={details.image} 
            alt={details.name} 
            className="w-[200px] max-md:w-full max-md:h-48 h-32 object-cover rounded-md"
          />
        </div>
        <div className="sm:ml-6 flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{details.name}</h3>
              <p className="text-sm text-gray-600">{details.title}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <p className="text-lg font-bold text-gray-800">${details.price}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input 
                type="number" 
                value={order} 
                readOnly 
                className="w-12 text-center border-none focus:outline-none"
                aria-label="Quantity"
              />
              <button 
                onClick={increaseQuantity}
                className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <p className="text-lg font-semibold text-gray-800 mt-2 sm:mt-0">
              Total: ${(details.price * order).toFixed(2)}
            </p>
          </div>
          <div className="mt-4 text-right">
            <button 
              onClick={handleRemoveFromCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}