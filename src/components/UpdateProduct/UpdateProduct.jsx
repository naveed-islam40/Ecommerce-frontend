import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductData } from "../../action/action";
import Carousel from "react-material-ui-carousel";
import "./updateproduct.css";
import { useSelector, useDispatch } from "react-redux";
import { updateProductAction } from "../../action/updateProductDetail";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { updateId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.productDetail);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    dispatch(getProductData(updateId));
  }, [updateId]);

  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProductAction(updateId, formData));
    toast.success("product update successfully", toastify);
    navigate("/dashboard/admin");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {product && (
        <>
          <h1>Update Product</h1>
          <form onSubmit={handleSubmit}>
            <Carousel className="imagesContainer">
              {product.images &&
                product.images.map((image, i) => (
                  <img
                    src={image.url}
                    key={image.url}
                    alt={`${i} image`}
                    className="productImages"
                  />
                ))}
            </Carousel>
            <div className="updateInputs">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Title"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
            </div>
            <div className="updateBtn">
              <button type="submit" className="UpdateBtn">
                Update Product
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateProduct;
