import React, { Fragment, useEffect, useState } from "react";
import Slider from 'react-slick';
import "./productDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProductData } from "../../action/action";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";
import { toast } from "react-toastify";
import MetaData from "../MetaData.jsx";
import toastify from "../../toastify/toastify";
import { addToCart } from "../../action/addToCartAction.js";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Chat from "./Chat.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GetProductDatail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );

  const [order, setOrder] = useState(1);

  useEffect(() => {
    if (error) {
      toast.error(error, toastify);
      dispatch(clearError());
    }
    dispatch(getProductData(id));
  }, [dispatch, id]);

  if (!product) {
    return <div>No product found</div>;
  }

  const addToCartItem = () => {
    dispatch(addToCart(id, order));
    toast.success("Item added successfully", toastify);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(product)

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          ></Box>
          <MetaData title={`${product.name} --E-COMMERCE`} />
          <div className="productdetailWrapper">
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

            <div className="productDetails">
              <div className="detailsBlock1">
                <h4>{product.name}</h4>
                <p>ProductId: #{product._id}</p>
              </div>

              <div className="detailsBlock2">
                <span>{`${product.NumberofReviews} Reviews`}</span>
                {product && product.ratings && (
                  <Rating
                    name="simple-controlled"
                    value={product.ratings}
                    precision={0.5}
                    size="large"
                    readOnly
                  />
                )}
              </div>

              <div className="detailsBlock3">
                <h3>{`$${product.price}`}</h3>
                <div className="detailBlock3-1">
                  <div className="detailBlock3-1-1">
                    <button onClick={() => order > 1 && setOrder(order - 1)}>
                      -
                    </button>
                    <input type="number" value={order} readOnly />
                    <button
                      onClick={() =>
                        order < product.stock && setOrder(order + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="detailBlock3-1-2">
                    <button onClick={addToCartItem}>
                      {product.stock < 1
                        ? "Currently Unavailable"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
                <div className="detailBlock3-2">
                  <h5>
                    Status:{" "}
                    {product.stock < 1 ? (
                      <p className="outofstock">Out of Stock</p>
                    ) : (
                      <p className="instock">InStock</p>
                    )}
                  </h5>
                </div>
              </div>

              <div className="detailsBlock4">
                <h4>Description</h4>
                <p>{product.description}</p>
                <button>Submit Review</button>
              </div>
            </div>
          </div>

          <div className="reviews">
            <div className="reviewsTop">
              <h1>Reviews</h1>
            </div>
            {product.reviews && product.reviews[0] ? (
              <div className="review">
                {product.reviews &&
                  product.reviews.map((review, index) => (
                    <ReviewCard review={review} key={index} />
                  ))}
              </div>
            ) : (
              <p className="norev">No reviews Yet</p>
            )}
          </div>
          <Chat />
        </div>
      )}
    </Fragment>
  );
};

export default GetProductDatail;
