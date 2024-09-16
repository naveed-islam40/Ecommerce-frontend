import React from "react";
import { Link } from "react-router-dom";

const LinkCard = ({ direction, bgColor, title, desc, IconColor, Icon }) => {
  return (
    <Link to={`${direction}`} style={{ textDecoration: "none", color: "#333" }}>
      <div
        className="dashboardCardWrapper"
        style={{ backgroundColor: bgColor }}
      >
        <div className="dashboardCardContent">
          <p className="cardTitle">{title}</p>
          <p className="carddesc">{desc}</p>
        </div>
        <div className="dashboardCardIcon">
          <Icon style={{ color: IconColor }} />
        </div>
      </div>
    </Link>
  );
};

export default LinkCard;
