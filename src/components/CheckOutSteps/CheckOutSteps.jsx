import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import React, { Fragment } from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import "./CheckOutSteps.css";

const CheckOutSteps = ({ activeSteps }) => {
  const steps = [
    {
      label: <Typography>Shpping Details</Typography>,
      Icon: <FaShippingFast />,
    },
    {
      label: <Typography> Confirm Order</Typography>,
      Icon: <MdOutlineLibraryAddCheck />,
    },
    {
      label: <Typography>Payments</Typography>,
      Icon: <BsBank />,
    },
  ];
  const stepsStyles = {
    boxSizing: "border-box",
    backgroundColor: "#F3F4F6"
  };
  const iconStyle = {
    fontSize: "25px",
  };

  return (
    <div className="checkoutWrapper">
      <Stepper alternativeLabel activeStep={activeSteps} style={stepsStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeSteps === index ? true : false}
            completed={activeSteps >= index ? true : false}
          >
            <StepLabel
              icon={<div style={iconStyle}>{item.Icon}</div>}
              style={{
                color: activeSteps >= index ? "tomato" : "rgba(0, 0, 0, 0.39)",
              }}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckOutSteps;
