import React, { Fragment } from "react";
import "./main.css";
import { CiDesktopMouse2 } from "react-icons/ci";
import Page2 from "../Page2/Page2";

const Main = () => {
  return (
    <Fragment>
      <div className="mainWrapper">
        <h3>Welcome to E-COMMERCE</h3>
        <h1>FIND AMAZING PRODUCT BELOW</h1>
        <a href="#Home" className="scrolll">
          Scroll <CiDesktopMouse2 />
        </a>
      </div>
      <Page2 />
    </Fragment>
  );
};

export default Main;
