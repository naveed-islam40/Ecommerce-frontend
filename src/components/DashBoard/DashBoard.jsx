import React, { useEffect } from "react";
import "./dashboard.css";
import Sidebar from "./SideBar.jsx";
import DashboardCards from "./DashboardCards";
import { RiCoinsLine } from "react-icons/ri";
import LinkCard from "./LinkCard.jsx";
import { FaCartArrowDown } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import ChartComponent from "./ChartComponent.jsx";
import DoughnutChart from "./DoughnutChart.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  AdminAllOrders,
  fetchProductsAndFilterByAdmin,
} from "../../action/getAdminProductAction";

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAndFilterByAdmin());
    dispatch(AdminAllOrders());
  }, []);

  const { products } = useSelector((state) => state.AdminProducts);
  const { data } = useSelector((state) => state.AllOrders);

  const totalAmount = data ? data.totalAmount : 0;

  return (
    <div className="dashBoradParentWrapper">
      <div className="sidebarContainer">
        <Sidebar />
      </div>

      <div className="dashBoardContainer">
        <p component="h1" className="dashboard">
          Dashboard
        </p>
        <div className="dashBoardSummeryParent">
          <DashboardCards
            title={"Total Amout"}
            desc={`${totalAmount}`}
            Icon={RiCoinsLine}
            IconColor={"gold"}
            bgColor={"#F1E3E4"}
          />

          <LinkCard
            title={"Products"}
            desc={`${products && products.length}`}
            Icon={FaCartArrowDown}
            IconColor={"green"}
            direction={"/dashboard/products"}
            bgColor={"#CCBCBC"}
          />
          <LinkCard
            title={"Order"}
            desc={data?.orders?.length || 0}
            Icon={FaShippingFast}
            IconColor={"#F15025"}
            direction={"/dashboard/orders"}
            bgColor={"#DAF7DC"}
          />
          <LinkCard
            title={"User"}
            desc={"2"}
            Icon={IoIosPerson}
            IconColor={"#FFBC42"}
            direction={"/dashboard/users"}
            bgColor={"#B8D0EB"}
          />
        </div>

        <div className="lineChart">
          <ChartComponent />
        </div>
        <div className="DoughnutChart">
          <DoughnutChart products={products} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
