import React, { useEffect } from "react";
import "./page2.css";
import Product from "../../components/Product/Product";
import { getProduct } from "../../action/action";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import toastify from "../../toastify/toastify";

const Page2 = () => {
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());

    if (error) {
      toast.error(error, toastify);
    }
  }, [dispatch, error]);

  return (
    <div className="page2Wrapper" id="Home">
      <div className="featured">
        <h3>FEATURED PRODUCTS</h3>
      </div>
      <div className="productContainer">
        {loading ? (
          <Loader />
        ) : (
          products &&
          products.map((product, index) => {
            return (
              <Product product={product} key={index} cartItems={cartItems} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Page2;
