import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductData } from "../../action/action";
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

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <div className="container">
      {product && (
        <>
          <h1>Update Product</h1>
          <form onSubmit={handleSubmit}>
          <div className="w-[550px] max-md:w-96 p-5 ">
              <Slider {...settings}>
                {product.images &&
                  product.images.map((src, index) => (
                    <div key={index}>
                      <img
                        src={src.url}
                        alt={`Carousel image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                        }}
                        className="rounded-md mt-[100px] mr-6 max-md:w-40"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
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
