import React, { useEffect, useState } from "react";
import "./ImageUploadSection.css";

const ImageUploadSection = ({ handleImageChange, currentImages }) => {
  const [images, setImages] = useState([]);

  console.log("images:", images);

  useEffect(() => {
    setImages(currentImages);
  }, [currentImages]);

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];

    if (!file) return;

    const newImages = [...images];

    if (index >= images.length) {
      newImages.push(file);
    } else {
      newImages[index] = file;
    }

    setImages(newImages);
    handleImageChange(newImages);
  };
  return (
    <form encType="multipart/form-data">
      <div className="image-upload-section">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="image-box">
            <input
              type="file"
              accept="image/*"
              className="image-input"
              name={`image-${index}`}
              onChange={(e) => handleImageUpload(index, e)}
            />
            <div className="image-container">
              {images && images[index] && (
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`Image ${index + 1}`}
                  className="uploaded-image"
                />
              )}
              {(!images || !images[index]) && (
                <label htmlFor={`upload-${index}`} className="upload-label">
                  <span className="upload-icon">+</span>
                  Upload
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default ImageUploadSection;
