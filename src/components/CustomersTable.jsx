import React, { useContext, useEffect, useState } from "react";
import { RiExpandUpDownFill } from "react-icons/ri";
import CustomerRow from "./CustomerRow";
import AddCustomers from "./AddCustomers";
import { MainContext } from "../Context/MainProvider";
import { MdGroupAdd } from "react-icons/md";

const CustomersTable = () => {
  const {
    customersData,
    receivePayment,
    addTransactionsToTransactions,
    fetchData,
    user,
  } = useContext(MainContext);

  const [filteredCustomers, setFilteredCustomers] = useState(customersData);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showReceivePayment, setShowReceivePayment] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState("");

  const [sortedBy, setSortedBy] = useState("default");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  useEffect(() => {
    setFilteredCustomers(customersData);
  }, [customersData]);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const tempData = customersData.filter((item) =>
      item.businessName.toLowerCase().includes(searchText)
    );
    setFilteredCustomers(tempData);
  };

  const handleReceivePayment = async () => {
    setLoading(true);
    await receivePayment(
      selectedCustomer,
      Number(selectedCustomer.outstandingBalance - inputData)
    );
    await addTransactionsToTransactions({
      buyer: selectedCustomer.businessName,
      date: new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      totalAmount: Number(inputData),
    });
    await fetchData(user.email);
    setShowReceivePayment(false);
    setLoading(false);
  };

  const sortByBalance = () => {
    if (sortedBy === "default") {
      setFilteredCustomers(
        [...customersData].sort(
          (a, b) => a.outstandingBalance - b.outstandingBalance
        )
      );
      setSortedBy("low-high");
    } else if (sortedBy === "low-high") {
      setFilteredCustomers(
        [...customersData].sort(
          (a, b) => b.outstandingBalance - a.outstandingBalance
        )
      );
      setSortedBy("high-low");
    } else {
      setFilteredCustomers(customersData);
      setSortedBy("default");
    }
  };

  if (showAddCustomer) {
    return <AddCustomers onClose={() => setShowAddCustomer(false)} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header & Search Bar */}
      <div className="flex-none">
        <h1 className="text-4xl font-semibold text-white mb-2 drop-shadow-xl">
          CUSTOMERS 🧑‍💼
        </h1>
        <div className="flex justify-between items-center mb-1">
          <div className="max-w-md">
            <input
              type="text"
              className="block w-full px-4 py-2 text-white text-sm border border-gray-400 bg-gray-800 rounded outline-0"
              placeholder="Search Customer"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div>
            <button
              onClick={() => setShowAddCustomer(true)}
              className="border bg-green-500 py-1 px-2 rounded inline-flex items-center gap-2 cursor-pointer active:bg-green-600"
            >
              Add New Customer <MdGroupAdd size={20} />
            </button>
          </div>
        </div>
      </div>

      {/*  Table */}
      {customersData.length > 0 ? (
        <>
          <div className="flex-grow overflow-auto max-h-[80vh]">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-900 text-gray-200 border-b border-white sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Contact
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3">
                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      title="Sort By Outstanding Balance"
                      onClick={sortByBalance}
                    >
                      Outstanding <RiExpandUpDownFill />
                    </span>
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((item, index) => (
                  <CustomerRow
                    key={index}
                    item={item}
                    setShowReceivePayment={setShowReceivePayment}
                    setSelectedCustomer={setSelectedCustomer}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {showReceivePayment && (
            <div className="fixed inset-0 bg-gray-700 flex items-center justify-center z-10">
              <div className="bg-gray-800 p-6 max-w-sm w-full">
                <h2 className="text-md text-white">Receive Payment from</h2>
                <h2 className="text-2xl text-white font-semibold mb-4">
                  {selectedCustomer?.businessName}
                </h2>
                <div>
                  <label className="text-sm text-gray-300">Date</label>
                  <input
                    type="date"
                    className="bg-gray-700 border border-gray-500 text-gray-300 text-sm rounded-lg w-full py-1 px-2"
                    // defaultValue={date}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <label className="text-sm text-gray-300">Amount</label>
                  <input
                    type="number"
                    min={1}
                    className="w-full p-2 text-gray-300 bg-gray-600 rounded-md"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                  />
                  {!inputData && (
                    <label className="text-red-500 text-sm">
                      Enter a valid amount
                    </label>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    onClick={() => {
                      setInputData(null);
                      setShowReceivePayment(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      loading || !inputData
                        ? "cursor-not-allowed"
                        : "cursor-pointer  hover:bg-green-600"
                    } bg-green-700 text-white rounded-lg`}
                    onClick={handleReceivePayment}
                    disabled={!inputData || loading}
                  >
                    {loading ? "loading ..." : "Recive Payment"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-400 text-center mt-10">
          Your Customers Will Be Displayed Here
        </div>
      )}
    </div>
  );
};

export default CustomersTable;
