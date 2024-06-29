import React, { useState, useEffect } from "react";

const TransactionsStatistics = ({ selectedMonth }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [totalNotSold, setTotalNotSold] = useState(0);

  // Array to map month numbers to month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = () => {
    fetch(
      `https://transctions-manage-system-3.onrender.com/getdata/month/${selectedMonth}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Calculate total price
        const totalPrice = data.reduce((acc, curr) => acc + curr.price, 0);
        setTotalPrice(totalPrice);

        // Calculate total sold and not sold
        const soldCount = data.filter((item) => item.sold).length;
        const notSoldCount = data.filter((item) => !item.sold).length;

        setTotalSold(soldCount);
        setTotalNotSold(notSoldCount);
      })
      .catch((error) => console.error("Error fetching statistics:", error));
  };

  return (
    <div className="bg-gradient-to-r from-orange-200 to-orange-400 p-4 rounded-lg shadow-md mt-5">
      <h1 className="text-3xl font-bold mb-4 text-orange-800">Statistics</h1>
      <p className="text-lg text-orange-900">
        Total price for {monthNames[selectedMonth - 1]} is: $
        {totalPrice.toFixed(2)}
      </p>
      <p className="text-lg text-orange-900">Total sold items: {totalSold}</p>
      <p className="text-lg text-orange-900">
        Total not sold items: {totalNotSold}
      </p>
    </div>
  );
};

export default TransactionsStatistics;
