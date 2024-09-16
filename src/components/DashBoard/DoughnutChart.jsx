import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ products }) => {
  const inStockCount =
    products &&
    products.reduce((count, product) => {
      if (product.stock > 0) {
        return count + 1;
      }
      return count;
    }, 0);

  const outStockCount =
    products &&
    products.reduce((count, product) => {
      if (product.stock < 1) {
        return count + 1;
      }
      return count;
    }, 0);

  const data = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        data: [inStockCount, outStockCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Product Availability",
      fontSize: 16,
      fontColor: "#333",
    },
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <h2 style={{ fontSize: "18px" }}>Doughnut Chart</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
