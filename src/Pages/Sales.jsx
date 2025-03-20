import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../Context/MainProvider";
import { RiExpandUpDownFill } from "react-icons/ri";
import { IoReceipt } from "react-icons/io5";
import Receipt from "../components/Receipt";

const Sales = () => {
  const { salesData, customersData } = useContext(MainContext);
  const [filteredData, setFilteredData] = useState(salesData);
  const dateRef = useRef();

  const [sortedByGrandTotal, setSortedByGrandTotal] = useState("default");
  const [sortedByDate, setSortedByDate] = useState("default");
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilteredData(() => {
      return salesData.filter(
        (item) =>
          item.customer.toLowerCase().includes(searchText) ||
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
        salesData.filter((item) => item.date === formattedDate)
      );
    } else {
      setFilteredData(salesData);
    }
  };

  const sortByDate = () => {
    if (sortedByDate === "default") {
      setFilteredData(() => {
        return [...salesData].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      });
      setSortedByDate("before-today");
    } else {
      setFilteredData(salesData);
      setSortedByDate("default");
    }
  };

  const sortByGrandTotal = () => {
    if (sortedByGrandTotal === "default") {
      setFilteredData(() => {
        const newData = [...salesData].sort(
          (a, b) => a.grandTotal - b.grandTotal
        );
        return newData;
      });
      setSortedByGrandTotal("grand-total-low-high");
    } else if (sortedByGrandTotal === "grand-total-low-high") {
      setFilteredData(() => {
        const newData = [...salesData].sort(
          (a, b) => b.grandTotal - a.grandTotal
        );
        return newData;
      });
      setSortedByGrandTotal("grand-total-high-low");
    } else {
      setFilteredData(salesData);
      setSortedByGrandTotal("default");
    }
  };

  useEffect(() => {
    setFilteredData(salesData);
  }, [salesData]);

  return (
    <div className="h-full">
      {showReceipt && (
        <Receipt
          products={Object.values(selectedItem.products)}
          setShowReceipt={setShowReceipt}
          customer={selectedItem.customer}
          customerAddress={
            customersData.find(
              (item) => item.businessName === selectedItem.customer
            ).address
          }
          resetForm={() => {}}
          totalAmount={selectedItem.grandTotal}
          date={selectedItem.date}
        />
      )}
      <h1 className="text-4xl font-semibold text-white mb-2 drop-shadow-xl">
        SALES 💸
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
      {salesData.length > 0 ? (
        <div className="flex-grow overflow-auto max-h-[80vh]">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-900 text-gray-200 border-b border-white sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-3 py-3 ">
                  S.N
                </th>
                <th scope="col" className="px-3 py-3">
                  Buyer
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
          Your Sales Records Will Be Displayed Here
        </div>
      )}
    </div>
  );
};

export default Sales;
