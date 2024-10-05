import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, clearError } from "../../action/action";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@mui/material';
import { toast } from "react-toastify";
import MetaData from "../MetaData";
import toastify from "../../toastify/toastify";

const categories = ["Clothing", "Shoes", "Jewelry", "Watches", "Bags", "Phones"];

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, currentProducts } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error, toastify);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, priceRange, category, rating));
  }, [dispatch, keyword, currentPage, priceRange, category, rating, error]);

  const handleChangePrice = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MetaData title="Products | E-Commerce" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Products</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-8 md:mb-0 md:pr-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Typography variant="h6" gutterBottom>Filters</Typography>
                <div className="mb-6">
                  <Typography id="range-slider" gutterBottom>
                    Price Range
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={handleChangePrice}
                    valueLabelDisplay="auto"
                    min={0}
                    max={200}
                    marks
                    step={10}
                  />
                </div>
                <div className="mb-6">
                  <Typography gutterBottom>Category</Typography>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`cursor-pointer hover:text-blue-600 ${
                          category === cat ? 'text-blue-600 font-semibold' : 'text-gray-600'
                        }`}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Typography component="legend" gutterBottom>Ratings Above</Typography>
                  <Slider
                    value={rating}
                    onChange={(e, newRating) => setRating(newRating)}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Product key={index} product={product} cartItems={cartItems} />
                ))}
              </div>
              {productsCount > 8 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={currentProducts}
                    totalItemsCount={productsCount}
                    onChange={(page) => setCurrentPage(page)}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="inline-block mx-1"
                    linkClass="px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    activeClass="bg-blue-500 text-white"
                    activeLinkClass="bg-blue-500 text-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}