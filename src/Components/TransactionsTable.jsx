import React, { useState, useEffect } from "react";
import Statistics from "./Statistics";
import Chart from "./Chart";

const TransactionsTable = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(0); // Default to March (corresponds to 3)
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage]);

  const fetchTransactions = () => {
    const queryParams = `?search=${search}&page=${currentPage}`;

    fetch(
      `https://transctions-manage-system-3.onrender.com/listall${queryParams}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTransactionData(data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
    setCurrentPage(1); // Reset currentPage when changing month
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth() + 1; // JavaScript Date.getMonth() returns 0-based index (0 for January)
  };

  // Mapping of month names to their corresponding numeric values (1 to 12)
  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Transaction"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value={0}>Select Month</option>
          {monthOptions.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-orange-100 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-orange-200 text-white">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Sold</th>
            <th className="py-2 px-4">Image</th>
          </tr>
        </thead>
        <tbody>
          {transactionData
            .filter((transaction) => {
              if (search === "") {
                return transaction;
              } else if (
                transaction.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return transaction;
              }
            })
            .filter((transaction) => {
              if (selectedMonth === 0) {
                return transaction;
              } else if (
                getMonthFromDate(transaction.dateOfSale) === selectedMonth
              ) {
                return transaction;
              }
            })
            .map((transaction) => (
              <tr key={transaction.id} className="text-center">
                <td className="py-2 px-4">{transaction.id}</td>
                <td className="py-2 px-4">{transaction.title}</td>
                <td className="py-2 px-4">{transaction.description}</td>
                <td className="py-2 px-4">{transaction.price}</td>
                <td className="py-2 px-4">{transaction.category}</td>
                <td className="py-2 px-4">{transaction.sold ? "Yes" : "No"}</td>
                <td className="py-2 px-4">
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    className="w-12 h-auto"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <h3>Page No: {currentPage}</h3>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-400 text-white rounded-md shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === 6}
            className="px-4 py-2 bg-orange-400 text-white rounded-md shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Next
          </button>
        </div>
        <h3 className="px-4 py-2 bg-orange-400 text-white rounded-md shadow-md">
          Per Page: 10
        </h3>
      </div>

      <Statistics selectedMonth={selectedMonth} />
      <Chart selectedMonth={selectedMonth} />
    </div>
  );
};

export default TransactionsTable;
