import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const TransactionChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "transaction-chart",
      },
      xaxis: {
        categories: [], // Will be populated dynamically
        labels: {
          show: true, // Hide x-axis labels
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff", // Adjust the color as needed
          },
        },
      },
      grid: {
        show: true, // Hide the grid
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Disable data labels on bars
      },
      tooltip: {
        theme: "dark", // Adjust the tooltip theme as needed
      },
      fill: {
        opacity: 1,
      },
      colors: ["#FF5733", "#C70039"], // Customize the colors of bars
    },
    series: [
      {
        name: "Price",
        data: [], // Will be populated dynamically
      },
      {
        name: "Sold",
        data: [], // Will be populated dynamically
      },
    ],
  });

  useEffect(() => {
    fetchChartData(selectedMonth);
  }, [selectedMonth]);

  const fetchChartData = (month) => {
    fetch(
      `https://transctions-manage-system-3.onrender.com/getdata/month/${month}`
    )
      .then((res) => res.json())
      .then((data) => {
        const categories = data.map((item) => item.title);
        const prices = data.map((item) => item.price);
        const soldItems = data.map((item) => (item.sold ? 1 : 0));

        setChartData({
          options: {
            ...chartData.options,
            xaxis: {
              categories: categories,
              labels: {
                show: false, // Hide x-axis labels
              },
            },
          },
          series: [
            {
              name: "Price",
              data: prices,
            },
            {
              name: "Sold",
              data: soldItems,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mixed-chart">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          width="600"
        />
      </div>
    </div>
  );
};

export default TransactionChart;
