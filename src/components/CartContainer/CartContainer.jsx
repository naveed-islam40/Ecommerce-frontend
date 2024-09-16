import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../action/addToCartAction.js";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify.js";

const CartContainer = ({ details }) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(details.quantity);

  useEffect(() => {
    setOrder(details.quantity);
  }, [details.quantity]);

  useEffect(() => {
    dispatch(addToCart(details.id, order));
  }, [order, dispatch, details.id]);

  const handleRemoveAtCart = () => {
    dispatch(removeFromCart(details.id));
    toast.success("Item removed from cart successfully!", toastify);
  };

  return (
    <Fragment>
      <div className="cartContainerWrapper">
        <div className="cartContLeft">
          <img src={details.image} alt="Image" className="cartImage" />
          <span>
            <p>{details.name}</p>
            <p>{details.title}</p>
            <button className="cartRemoveBtn" onClick={handleRemoveAtCart}>
              Remove
            </button>
          </span>
        </div>
        <div className="cartContCenter child">
          <p>${details.price}</p>
        </div>
        <div className="detailBlock3-1-1 child">
          <button onClick={() => order > 1 && setOrder(order - 1)}>-</button>
          <input type="number" value={order} readOnly />
          <button onClick={() => order < details.stock && setOrder(order + 1)}>
            +
          </button>
        </div>
        <div className="cartContRight child">
          <p>${(details.price * details.quantity).toFixed(2)}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default CartContainer;
