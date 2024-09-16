import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="footerleft">
        <h4>Download our App</h4>
        <p>Download our app for Android and IOS</p>
        <span>
          <img src="/images/two.png" alt="" />
          <img src="/images/one.png" alt="" />
        </span>
      </div>
      <div className="footermiddle">
        <h1>E-COMMERCE</h1>
        <p>High quality is our first priority</p>
        <h6>copyright 2023 &copy; Naveed_Islam </h6>
      </div>
      <div className="footerright">
        <a href="#">Follow Us</a>
        <li>
          <a href=""> Instagram </a>
        </li>
        <li>
          <a href=""> LinkedIn</a>
        </li>
        <li>
          <a href=""> Twitter </a>
        </li>
      </div>
    </div>
  );
};

export default Footer;
