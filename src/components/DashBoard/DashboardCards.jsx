import React from "react";

const DashboardCards = ({ title, desc, bgColor, Icon, IconColor }) => {
  return (
    <div className="dashboardCard">
      <div
        className="dashboardCardWrapper"
        style={{ backgroundColor: bgColor }}
      >
        <div className="dashboardCardContent">
          <p className="cardTitle">{title}</p>
          <p className="carddesc">${desc}</p>
        </div>
        <div className="dashboardCardIcon">
          <Icon style={{ color: IconColor }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
