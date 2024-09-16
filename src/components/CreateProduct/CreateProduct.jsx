import React, { useState } from "react";
import "./createproduct.css";
import { clearError, createProduct } from "../../action/createProductAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";

const FormComponent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [catagory, setCatagory] = useState("");
  const [stock, setStock] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prevImages) => [...prevImages, reader.result]);
          setImages((prevImages) => [...prevImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearError());
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("description", description);
    myForm.set("catagory", catagory);

    images.forEach((image) => myForm.append("images", image));

    dispatch(createProduct(myForm));

    toast.success("Product Create Successfully", toastify);
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category:</label>
          <input
            type="text"
            name="catagory"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            name="avatar"
            className="form-file-input"
            onChange={handleImageUpload}
          />
          {imagesPreview.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className="image-preview"
            />
          ))}
        </div>
        <div className="createProduct-submit-button">
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
