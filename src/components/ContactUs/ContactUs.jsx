import React, { useState } from "react";
import "./contact.css";
import { useDispatch } from "react-redux";
import { contactUsAction } from "../../action/contactUsAction";
import { toast } from "react-toastify";
import toastify from "../../toastify/toastify";

const ContactUs = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleContactUs = (e) => {
    e.preventDefault();
    try {
      dispatch(contactUsAction(user.email, message));
      toast.success(
        "your action has been submitted, we'll contact you as soon as possible",
        toastify
      );
    } catch (error) {
      toast.error(error, toastify);
    }
    setMessage("");
  };
  return (
    <div className="contactParent">
      <div className="conatctHeading">
        <h1>Contact Us</h1>
      </div>
      <form className="contactForm" onSubmit={handleContactUs}>
        <input
          type="text"
          placeholder="Enter Message"
          className="searchInput"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="searchsubmitBtn">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;
