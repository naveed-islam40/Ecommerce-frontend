import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearError } from "../../action/action";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { toast, Bounce } from "react-toastify";
import MetaData from "../MetaData";
import toastify from "../../toastify/toastify";

let categories = ["Clothing", "Shoes", "Jewelry", "Watches", "Bags", "Phones"];

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, currentProducts } =
    useSelector((state) => state.products);

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
  }, [dispatch, keyword, currentPage, priceRange, category, rating]);

  // setCurrentPageNo
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  //priceHandler
  const handleChangePrice = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Fragment>
      <MetaData title="PRODUCTS --E-COMMERCE" />
      <div className="heading">
        <h1>Products</h1>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="products-mainContainer">
          <div className="paginationProducts">
            {products.map((product, index) => (
              <Product product={product} key={index} cartItems={cartItems} />
            ))}
          </div>

          <div className="price-slider">
            {/* Price Filter */}
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

            {/* category Filter */}
            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="categoryLink"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            {/* {ratings filtered} */}
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => setRating(newRating)}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          <div className="pagination">
            {currentProducts < productsCount && (
              <Pagination
                activePage={currentPage}
                totalItemsCount={productsCount || 4}
                itemsCountPerPage={currentProducts}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Pre"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pagelinkActive"
              />
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Products;
