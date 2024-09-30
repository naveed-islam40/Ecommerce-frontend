import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProductData } from "../../action/action";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReviewCard from "../ReviewCard/ReviewCard";
import { toast } from "react-toastify";
import MetaData from "../MetaData";
import toastify from "../../toastify/toastify";
import { addToCart } from "../../action/addToCartAction";
import Rating from "@mui/material/Rating";
import Chat from "./Chat";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );

  const [order, setOrder] = useState(1);

  useEffect(() => {
    if (error) {
      toast.error(error, toastify);
      dispatch(clearError());
    }
    dispatch(getProductData(id));
  }, [dispatch, id, error]);

  if (!product) {
    return <div className="text-center py-20 text-2xl">No product found</div>;
  }

  const addToCartItem = () => {
    dispatch(addToCart(id, order));
    toast.success("Item added successfully", toastify);
  };

  return (
    <Fragment>
      <MetaData title={`${product.name} - E-COMMERCE`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full max-w-md mx-auto">
              <Carousel
                showArrows={true}
                showIndicators={true}
                showThumbs={false}
                infiniteLoop={true}
                className="product-carousel"
              >
                {product.images &&
                  product.images.map((image, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1">
                      <img
                        src={image.url}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-4">Product ID: #{product._id}</p>
                <div className="flex items-center mb-4">
                  <Rating
                    name="product-rating"
                    value={product.ratings}
                    precision={0.5}
                    size="large"
                    readOnly
                  />
                  <span className="ml-2 text-sm text-gray-600">{product.NumberofReviews} Reviews</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-4">${product.price}</p>
                <p className="text-gray-700 mb-6">{product.description}</p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <button 
                    onClick={() => order > 1 && setOrder(order - 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={order} 
                    readOnly 
                    className="w-16 text-center border-t border-b border-gray-300 py-2"
                  />
                  <button 
                    onClick={() => order < product.stock && setOrder(order + 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={addToCartItem}
                  disabled={product.stock < 1}
                  className={`w-full py-3 px-6 text-white font-semibold rounded-md ${
                    product.stock < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
                </button>
                <p className="mt-2 text-sm text-gray-600">
                  Status: 
                  <span className={product.stock < 1 ? 'text-red-600' : 'text-green-600'}>
                    {product.stock < 1 ? " Out of Stock" : " In Stock"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
            {product.reviews && product.reviews[0] ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.reviews.map((review, index) => (
                  <ReviewCard review={review} key={index} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No reviews yet</p>
            )}
          </div>

          <div className="mt-16">
            <Chat />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetail;