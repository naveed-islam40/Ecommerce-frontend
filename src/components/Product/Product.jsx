import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../action/addToCartAction";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";

const Product = ({ product, cartItems }) => {
  const [isProductExist, setIsProductExist] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const existingProduct = cartItems?.find((item) => item.id === product._id);
    setIsProductExist(!!existingProduct);
  }, [cartItems, product._id]);

  const handleCartAction = () => {
    if (isProductExist) {
      dispatch(removeFromCart(product._id));
      toast.success("Removed from cart successfully", toastify);
    } else {
      dispatch(addToCart(product._id, 1));
      toast.success("Added to cart successfully", toastify);
    }
    setIsProductExist(!isProductExist);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${product._id}`} className="block no-underline">
        <div className="relative pb-[56.25%]">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate no-underline">
            {product.name}
          </h2>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.ratings)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.NumberofReviews} Reviews
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${product.price}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300 ${
            isProductExist
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          onClick={handleCartAction}
        >
          {isProductExist ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;