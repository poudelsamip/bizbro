import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../Context/MainProvider";
import { RiExpandUpDownFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Transactions = () => {
  // const { transactionsData } = useContext(MainContext);
  const transactionsData = useSelector(
    (state) => state.transactions.transactionsData
  );
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionsData);
  const [sortedByTotal, setSortedByTotal] = useState("default");
  const [sortedByDate, setSortedByDate] = useState("default");
  const dateRef = useRef();

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    // const filtered = transactionsData.filter((transaction) => {
    //   return (
    //     transaction.buyer.toLowerCase().includes(searchText) ||
    //     transaction.totalAmount.toString().includes(searchText)
    //   );
    // });

    setFilteredTransactions(() =>
      transactionsData.filter(
        (transaction) =>
          transaction.buyer.toLowerCase().includes(searchText) ||
          transaction.totalAmount.toString().includes(searchText)
      )
    );
  };

  const filterByDate = () => {
    const inputDate = dateRef.current.value;
    if (inputDate) {
      const date = new Date(inputDate);
      const dateFormat = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", dateFormat);

      setFilteredTransactions(() =>
        transactionsData.filter(
          (transaction) => transaction.date === formattedDate
        )
      );
    } else {
      setFilteredTransactions(transactionsData);
    }
  };

  const sortByTotal = () => {
    if (sortedByTotal === "default") {
      setFilteredTransactions(
        [...transactionsData].sort((a, b) => a.totalAmount - b.totalAmount)
      );
      setSortedByTotal("low-high");
    } else if (sortedByTotal === "low-high") {
      setFilteredTransactions(
        [...transactionsData].sort((a, b) => b.totalAmount - a.totalAmount)
      );
      setSortedByTotal("high-low");
    } else {
      setFilteredTransactions(transactionsData);
      setSortedByTotal("default");
    }
  };

  const sortByDate = () => {
    if (sortedByDate === "default") {
      setFilteredTransactions(
        [...transactionsData].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )
      );
      setSortedByDate("earliest-latest");
    } else if (sortedByDate === "earliest-latest") {
      setFilteredTransactions(
        [...transactionsData].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
      setSortedByDate("latest-earliest");
    } else {
      setFilteredTransactions(transactionsData);
      setSortedByDate("default");
    }
  };

  useEffect(() => {
    setFilteredTransactions(transactionsData);
  }, [transactionsData]);

  return (
    <div className="h-full">
      <h1 className="text-4xl font-semibold text-white mb-2 drop-shadow-xl">
        TRANSACTIONS 💳
      </h1>
      <div className="flex justify-between mb-1">
        <input
          type="text"
          className="block px-4 py-2 text-white text-sm border border-gray-400 bg-gray-800 outline-0 w-[250px]"
          placeholder="Search Transaction"
          onChange={handleSearch}
        />

        <div>
          <input
            type="date"
            className="text-gray-400  px-4 py-2  text-sm border border-gray-400 bg-gray-800 outline-0"
            ref={dateRef}
          />
          <button
            className="px-4 h-full text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-400 bg-gray-800 cursor-pointer"
            onClick={filterByDate}
          >
            filter
          </button>
        </div>
      </div>

      {/* Table */}
      {transactionsData.length > 0 ? (
        <div className="flex-grow overflow-auto max-h-[80vh]">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-900 text-gray-200 border-b border-white sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-3 py-3">
                  S.N
                </th>

                <th scope="col" className="px-3 py-3">
                  Buyer
                </th>

                <th scope="col" className="px-3 py-3 ">
                  <div
                    className="flex gap-1 items-center cursor-pointer"
                    title="Sort By Amount"
                    onClick={sortByTotal}
                  >
                    <span>Amount</span>
                    <span className="cursor-pointer">
                      <RiExpandUpDownFill />
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 ">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    title="Sort By Date"
                    onClick={sortByDate}
                  >
                    <span>Date</span>
                    <span className="cursor-pointer">
                      <RiExpandUpDownFill />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((item, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-b bg-gray-800 border-gray-500 hover:bg-gray-700"
                >
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="px-3 py-3">{item.buyer}</td>
                  <td className="px-3 py-3">
                    Rs. {item.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-3 py-3">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};

export default Transactions;
