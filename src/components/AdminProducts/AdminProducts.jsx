import React, { Fragment, useEffect } from "react";
import "./AdminProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAndFilterByAdmin } from "../../action/getAdminProductAction";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductsAndFilterByAdmin());
  }, []);

  const { products } = useSelector((state) => state.AdminProducts);

  const editProduct = (productId) => {
    navigate(`/edit/admin/${productId}`);
  };

  const deleteProduct = (productId) => {
    navigate(`/delete/admin/${productId}`);
  };

  return (
    <div className="adminproductParent">
      {products &&
        products.map((product, index) => (
          <div className="adminproductWrapper" key={index}>
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="adminproductimg"
            />
            <h5 style={{ margin: "10px 0", fontWeight: "500" }}>
              {product.name}
            </h5>
            <Rating
              name="simple-controlled"
              value={product.ratings}
              precision={0.5}
              readOnly
              style={{ margin: "10px 0" }}
            />
            <p>$ {product.price}</p>
            <div className="adminProductBtn">
              <button onClick={() => editProduct(product._id)}>Edit</button>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminProducts;
