import React, { useEffect } from "react";
import Product from "../../components/Product/Product";
import { getProduct } from "../../action/action";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import toastify from "../../toastify/toastify";

const Page2 = () => {
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());

    if (error) {
      toast.error(error, toastify);
    }
  }, [dispatch, error]);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="Home">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our handpicked selection of top-quality items
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {products &&
              products.map((product, index) => (
                <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <Product product={product} cartItems={cartItems} />
                </div>
              ))}
          </div>
        )}

        {productsCount > 0 && (
          <div className="mt-12 text-center">
            <p className="text-base text-gray-700">
              Showing {products.length} of {productsCount} products
            </p>
          </div>
        )}

        {products && products.length === 0 && !loading && (
          <div className="text-center mt-12">
            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page2;