import React, { Fragment, useState } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../action/addToCartAction";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";
import { Box, Rating } from "@mui/material";

const Product = ({ product, cartItems }) => {
  const [isProductExist, setIsProductExist] = useState(false);
  const dispatch = useDispatch();

  const existingProducts = cartItems?.find((item) => item.id === product._id);

  useState(() => {
    setIsProductExist(existingProducts ? true : false);
  }, [existingProducts]);

  const handleCartAction = () => {
    if (isProductExist) {
      dispatch(removeFromCart(product._id));
      toast.success("Remove from cart successfully", toastify);
    } else {
      dispatch(addToCart(product._id, 1));
      toast.success("Add to cart successfully", toastify);
    }
    setIsProductExist(!isProductExist);
  };

  return (
    <div className="parentWrapper">
      <div className="productWrapper">
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        ></Box>
        <Link className="productsWrapper" to={`/product/${product._id}`}>
          <img src={product.images[0]?.url} alt="" />
          <div className="productTextContent">
            <h5 className="title">{product.name}</h5>
            <div className="review">
              <Rating
                name="simple-controlled"
                value={product.ratings}
                precision={0.5}
                readOnly
              />
              <span>{`${product.NumberofReviews} Reviews`}</span>
            </div>
            <p className="price">{`$${product.price}`}</p>
          </div>
        </Link>
        <button className="cartBtns" onClick={handleCartAction}>
          {isProductExist ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
