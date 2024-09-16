import React, { useEffect, useState } from "react";
import "./shipping.css";
import { FaCity } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";
import { FaLocationDot, FaPersonWalking } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { FaPhone } from "react-icons/fa";
import { countries } from "../../countries/Countries";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../action/addToCartAction";

const ShippingInfo = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [selectedCountry, setSelectedCountry] = useState(
    shippingInfo.selectedCountry || ""
  );
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [pincode, setPincode] = useState(shippingInfo.pincode || "");
  const [streetNo, setStreetNo] = useState(shippingInfo.streetNo || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShippingInfo = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        city,
        pincode,
        streetNo,
        phoneNo,
        state,
        selectedCountry,
      })
    );
    navigate("/confirm/order");
  };

  return (
    <div className="shippingWrapper">
      <CheckOutSteps activeSteps={0} />
      <MetaData title="SHIPPING INFO" />

      <div className="shippingParent">
        <h2 className="shippingHeading">Shipping Info</h2>
        <form>
          <div className="shippingInput">
            <BiWorld />
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="" disabled defaultValue>
                Select Country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="shippingInput">
            <FaPersonWalking />
            <input
              type="text"
              id="city"
              placeholder="STATE"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="shippingInput">
            <FaCity />
            <input
              type="text"
              id="city"
              placeholder="CITY"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="shippingInput">
            <TbMapPinCode />
            <input
              type="text"
              id="pincode"
              placeholder="PINCODE"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <div className="shippingInput">
            <FaLocationDot />
            <input
              type="text"
              placeholder="STREET"
              id="street"
              value={streetNo}
              onChange={(e) => setStreetNo(e.target.value)}
            />
          </div>

          <div className="shippingInput">
            <FaPhone />
            <input
              type="text"
              placeholder="PHONE NO."
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
        </form>
        <button
          type="submit"
          className="shippingBtn"
          onClick={handleShippingInfo}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ShippingInfo;
