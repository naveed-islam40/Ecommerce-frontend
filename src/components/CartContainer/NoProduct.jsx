import React, { Fragment } from "react";
import "./NoProduct.css";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const NoProduct = () => {
  return (
    <Fragment>
      <div className="noProductWrapper">
        <MdRemoveShoppingCart />
        <h1>No Product in Cart</h1>
        <Link to="/Products">View Products</Link>
      </div>
    </Fragment>
  );
};

export default NoProduct;
