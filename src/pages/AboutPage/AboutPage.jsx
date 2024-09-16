import React from "react";
import "./about.css";

const AboutPage = () => {
  return (
    <div className="aboutPageParent">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="aboutHeading">About Page</h1>
      </div>
      <div className="contentSection">
        <div>
          <div className="contentImg">
            <img src="/images/mylogo.png" alt="" />
          </div>
          <div className="contentText">
            <p className="about-para">
              Welcome to <b>PK dukan</b>, your ultimate destination for online
              shopping! At <b>PK dukan</b>, we are dedicated to providing our
              users with the best quality products and a seamless shopping
              experience. Whether you're looking for the latest fashion trends
              or timeless classics, we've got you covered.
            </p>
          </div>
        </div>
        <div>
          <div className="contentText">
            <p className="about-para">
              Our website is designed with your convenience in mind, offering a
              user-friendly interface that makes browsing and purchasing your
              favorite products a breeze. We stay up-to-date with the latest
              fashion trends to ensure that you have access to the hottest
              styles right at your fingertips.
            </p>
          </div>
          <div className="contentImg">
            <img src="/images/image-2.svg" alt="image-2" />
          </div>
        </div>
        <div>
          <div className="contentImg">
            <img src="/images/image-3.svg" alt="image-2" />
          </div>
          <div className="contentText">
            <p className="about-para">
              At <b>PK dukan</b>, we prioritize fast and efficient communication
              between our customers and clients. Our dedicated team is always
              ready to assist you with any inquiries, concerns, or feedback you
              may have. We believe in building strong relationships with our
              customers and strive to provide exceptional customer service at
              every step of your shopping journey.
            </p>
          </div>
        </div>
      </div>
      <div className="socialSection"></div>
    </div>
  );
};

export default AboutPage;
