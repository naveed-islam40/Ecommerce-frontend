import React, { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { MdDashboard } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { MdOutlineBorderBottom } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { logout } from "../../action/userAction";
import { useDispatch } from "react-redux";
import "./userOption.css";
import Backdrop from "@mui/material/Backdrop";
import { IoCart } from "react-icons/io5";
import toastify from "../../toastify/toastify";
import { useSelector } from "react-redux";

export default function UserOptions({ user }) {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Oder = () => {
    navigate("/order/me");
  };

  const Profile = () => {
    navigate("/account");
  };

  const Logout = () => {
    dispatch(logout());
    toast.success("Logout Successfully", toastify);
    navigate("/signup");
  };

  const Dashboard = () => {
    navigate("/dashboard/admin");
  };

  const cart = () => {
    navigate("/cart");
  };

  const actions = [
    { icon: <MdOutlineBorderBottom />, name: "Order", func: Oder },
    { icon: <IoPersonCircleSharp />, name: "Profile", func: Profile },
    {
      icon: (
        <IoCart style={{ color: cartItems.length >= 1 ? "tomato" : "unset" }} />
      ),
      name: `cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <IoMdExit />, name: "Logout", func: Logout },
  ];

  if (user.role === "admin") {
    actions.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: Dashboard,
    });
  }

  return (
    <React.Fragment>
      <Backdrop open={open} style={{ zIndex: "9" }} />
      <SpeedDial
        sx={{ position: "fixed", top: 16, right: 16, zIndex: "10" }}
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speeddial"
        icon={
          <img
            src={user.avatar.url ? user.avatar.url : "/images/defa.png"}
            alt={user.name}
            className="speedIcon"
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  );
}
