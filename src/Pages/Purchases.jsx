import React, { useContext, useEffect, useRef, useState } from "react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { IoReceipt } from "react-icons/io5";
import { useSelector } from "react-redux";

const Purchases = () => {
  const purchaseData = useSelector((state) => state.purchases.purchaseData);
  const [filteredData, setFilteredData] = useState(purchaseData);
  const dateRef = useRef();

  const [sortedByGrandTotal, setSortedByGrandTotal] = useState("default");
  const [sortedByDate, setSortedByDate] = useState("default");

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilteredData(() => {
      return purchaseData.filter(
        (item) =>
          item.supplier.toLowerCase().includes(searchText) ||
          Object.values(item.products).some((product) =>
            product.itemName.toLowerCase().includes(searchText)
          )
      );
    });
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

      setFilteredData(() =>
        purchaseData.filter((item) => item.date === formattedDate)
      );
    } else {
      setFilteredData(purchaseData);
    }
  };

  const sortByDate = () => {
    if (sortedByDate === "default" || sortedByDate === "newest-oldest") {
      // Switch to oldest-to-newest
      setFilteredData(() => {
        return [...purchaseData].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      });
      setSortedByDate("oldest-newest");
    } else {
      // Switch back to newest-to-oldest
      setFilteredData(() => {
        return [...purchaseData].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      });
      setSortedByDate("newest-oldest");
    }
  };

  const sortByGrandTotal = () => {
    if (sortedByGrandTotal === "default") {
      setFilteredData(() => {
        const newData = [...purchaseData].sort(
          (a, b) => a.grandTotal - b.grandTotal
        );
        return newData;
      });
      setSortedByGrandTotal("grand-total-low-high");
    } else if (sortedByGrandTotal === "grand-total-low-high") {
      setFilteredData(() => {
        const newData = [...purchaseData].sort(
          (a, b) => b.grandTotal - a.grandTotal
        );
        return newData;
      });
      setSortedByGrandTotal("grand-total-high-low");
    } else {
      setFilteredData(purchaseData);
      setSortedByGrandTotal("default");
    }
  };

  useEffect(() => {
    // Sort by date (newest to oldest) by default
    const sortedData = [...purchaseData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setFilteredData(sortedData);
    setSortedByDate("newest-oldest"); // Set initial state
  }, [purchaseData]);

  return (
    <div className="h-full">
      <h1 className="text-4xl font-semibold text-white mb-2 drop-shadow-xl">
        PURCHASES 📦
      </h1>
      <div className="mb-1 flex justify-between">
        <input
          type="text"
          className="block px-4 py-2 text-white text-sm border border-gray-400 bg-gray-800 outline-0 w-[250px]"
          placeholder="Search By Buyer or Product"
          onChange={(e) => handleSearch(e)}
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
      {purchaseData.length > 0 ? (
        <div className="flex-grow overflow-auto max-h-[80vh]">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-900 text-gray-200 border-b border-white sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-3 py-3 ">
                  S.N
                </th>
                <th scope="col" className="px-3 py-3">
                  Supplier
                </th>
                <th scope="col" className="px-3 py-3">
                  Products
                </th>
                <th scope="col" className="px-3 py-3">
                  Price
                </th>
                <th scope="col" className="px-3 py-3">
                  Qty
                </th>
                <th scope="col" className="px-3 py-3">
                  Total
                </th>
                <th scope="col" className="px-3 py-3">
                  <span
                    className="flex items-center gap-1 cursor-pointer"
                    title="Sort By Total"
                    onClick={sortByGrandTotal}
                  >
                    Grand Total <RiExpandUpDownFill />
                  </span>
                </th>
                <th scope="col" className="px-3 py-3">
                  <span
                    className="flex items-center gap-1 cursor-pointer"
                    title="Sort By Date"
                    onClick={sortByDate}
                  >
                    Date <RiExpandUpDownFill />
                  </span>
                </th>
                <th scope="col" className="px-3 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="cursor-pointer border-b bg-gray-800 border-gray-500 hover:bg-gray-700"
                >
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="px-3 py-3">{item.customer}</td>
                  <td className="px-3 py-3">
                    {Object.entries(item.products).map(([key, itm]) => (
                      <p key={`itemName${key}${itm.itemName}`}>
                        {itm.itemName}
                      </p>
                    ))}
                  </td>
                  <td className="px-3 py-3">
                    {Object.entries(item.products).map(([key, itm]) => (
                      <p key={`itemName${key}${itm.price}`}>
                        Rs. {itm.price.toLocaleString("en-IN")}
                      </p>
                    ))}
                  </td>
                  <td className="px-3 py-3">
                    {Object.entries(item.products).map(([key, itm]) => (
                      <p key={`itemName${key}${itm.quantity}`}>
                        {itm.quantity}
                      </p>
                    ))}
                  </td>
                  <td className="px-3 py-3">
                    {Object.entries(item.products).map(([key, itm]) => (
                      <p
                        key={`itemName${key}${itm.totalPrice.toLocaleString(
                          "en-IN"
                        )}`}
                      >
                        Rs. {itm.totalPrice}
                      </p>
                    ))}
                  </td>
                  <td className="px-3 py-3">
                    Rs. {item.grandTotal.toLocaleString("en-IN")}
                  </td>
                  <td className="px-3 py-3">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-3 py-3">
                    <IoReceipt
                      title="See Invoice"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowReceipt(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-400 text-center mt-10">
          Your Purchase Records Will Be Displayed Here
        </div>
      )}
    </div>
  );
};

export default Purchases;
