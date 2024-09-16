import "chart.js/auto";

import React from "react";
import { Line } from "react-chartjs-2";

const ChartComponent = () => {
  const today = new Date();
  const labels = [];

  for (let i = 6; i >= 0; i--) {
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - i);
    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][previousDay.getDay()];
    labels.push(dayName);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Earning",
        data: [0, 2000, 300, 4000, 200, 3450, 349],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="sidebarWrapper">
      <Line data={data} style={{ width: "60vw" }} />;
    </div>
  );
};

export default ChartComponent;
