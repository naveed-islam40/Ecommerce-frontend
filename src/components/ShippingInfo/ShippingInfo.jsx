import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCity, FaPhone } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { TbMapPinCode } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { countries } from "../../countries/Countries";
import { saveShippingInfo } from "../../action/addToCartAction";
import MetaData from "../MetaData";
import CheckOutSteps from "../../components/CheckOutSteps/CheckOutSteps";

export default function ShippingInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    selectedCountry: shippingInfo.selectedCountry || "",
    state: shippingInfo.state || "",
    city: shippingInfo.city || "",
    pincode: shippingInfo.pincode || "",
    streetNo: shippingInfo.streetNo || "",
    phoneNo: shippingInfo.phoneNo || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    if (formData.phoneNo && !/^\d{11}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Phone number must be 11 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingInfo = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(saveShippingInfo(formData));
      navigate("/confirm/order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <CheckOutSteps activeSteps={0} />
      <MetaData title="Shipping Information" />
      <div className="max-w-lg mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Shipping Information</h2>
          <form onSubmit={handleShippingInfo} className="space-y-6">
            <div>
              <label htmlFor="selectedCountry" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BiWorld className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="selectedCountry"
                  name="selectedCountry"
                  value={formData.selectedCountry}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="" disabled>Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              {errors.selectedCountry && <p className="mt-2 text-sm text-red-600">{errors.selectedCountry}</p>}
            </div>

            {[
              { name: "state", icon: FaPersonWalking, placeholder: "State" },
              { name: "city", icon: FaCity, placeholder: "City" },
              { name: "pincode", icon: TbMapPinCode, placeholder: "Pincode" },
              { name: "streetNo", icon: FaLocationDot, placeholder: "Street" },
              { name: "phoneNo", icon: FaPhone, placeholder: "Phone Number" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.placeholder}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <field.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name={field.name}
                    id={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
                {errors[field.name] && <p className="mt-2 text-sm text-red-600">{errors[field.name]}</p>}
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue to Order Confirmation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}