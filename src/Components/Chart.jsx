import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";

// Register necessary modules
Chart.register(...registerables);

const ChartComponent = ({ selectedMonth }) => {
  const [priceRanges, setPriceRanges] = useState([]);
  const [itemCounts, setItemCounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = () => {
    fetch(`http://localhost:5000/getdata/month/${selectedMonth}`)
      .then((res) => res.json())
      .then((data) => {
        const { priceRanges, itemCounts } = calculatePriceRanges(data);
        setPriceRanges(priceRanges);
        setItemCounts(itemCounts);
        renderChart(priceRanges, itemCounts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const calculatePriceRanges = (data) => {
    // Implement your price range calculation logic here
    // Example logic:
    // const priceRanges = [23, 23, 23];
    // const itemCounts = [5, 3, 3, 3, 3];
    return { priceRanges, itemCounts };
  };

  const renderChart = (priceRanges, itemCounts) => {
    const ctx = document.getElementById("myChart");
    if (ctx) {
      // Check if a chart instance already exists on this canvas
      // If yes, destroy it before creating a new one
      Chart.getChart(ctx)?.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: priceRanges,
        datasets: [
          {
            label: "Number of Items",
            data: itemCounts,
            backgroundColor: "rgba(255, 159, 64, 0.6)", // Orange color
            borderColor: "rgba(255, 159, 64, 1)", // Darker orange color
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Items",
            },
          },
          x: {
            title: {
              display: true,
              text: "Price Range",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Store the chart instance in state or a variable if needed
    // This can help manage the chart instance for future updates or destruction
  };

  return (
    <div className="bg-gradient-to-r from-orange-200 to-orange-400 p-4 rounded-lg shadow-md mt-5">
      <h1 className="text-3xl font-bold mb-4 text-orange-800">Chart</h1>
      <div className="flex justify-center">
        <canvas
          id="myChart"
          className="bg-white rounded-lg shadow-md"
          width="400"
          height="400"
        ></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
