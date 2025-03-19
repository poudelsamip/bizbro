import React, { useContext, useState } from "react";
import SubForm from "../components/SubForm";
import Receipt from "../components/Receipt";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../Context/MainProvider";
import { GiConfirmed } from "react-icons/gi";

const DispatchProduct = () => {
  const [customer, setCustomer] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [products, setProducts] = useState([
    { id: 0, price: 0, quantity: 0, totalPrice: 0, itemName: "" },
  ]);

  const [showSummary, setShowSummary] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [payment, setPayment] = useState();

  const {
    customersData,
    addSalesToSales,
    addTransactionsToTransactions,
    updateOutStandingBalance,
    updateStock,
    fetchData,
    user,
  } = useContext(MainContext);

  const resetForm = () => {
    setCustomer("");
    setCustomerAddress("");
    setProducts([
      { id: 0, price: 0, quantity: 0, totalPrice: 0, itemName: "" },
    ]);
    setNextId(1);
  };

  const handleRadioChange = (e) => {
    setPayment(e.target.value);
  };

  const handleConfirmDispatch = async () => {
    setLoading(true);

    const totalAmount = products.reduce(
      (acc, product) => acc + product.totalPrice,
      0
    );
    let dispatchedItems = [];
    products.map((item) => dispatchedItems.push(item));
    if (payment === "credit") {
      await updateOutStandingBalance(customer, totalAmount);
    }
    if (payment === "cash") {
      console.log(date);
      await addTransactionsToTransactions({
        date: new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        buyer: customer,
        totalAmount: totalAmount,
      });
    }
    await Promise.all([
      addSalesToSales(products, customer),
      updateStock(dispatchedItems),
    ]);
    // await addSalesToSales(products, customer);
    // await updateStock(dispatchedItems);
    await fetchData(user.email);
    setShowSummary(false);
    setLoading(false);
    setShowReceipt(true);
  };

  return (
    <div className="h-full">
      {showReceipt && (
        <Receipt
          products={products}
          setShowReceipt={setShowReceipt}
          customer={customer}
          setProducts={setProducts}
          customerAddress={customerAddress}
          resetForm={resetForm}
        />
      )}

      {showSummary && (
        <div className="fixed inset-0 bg-gray-700 flex items-center justify-center z-10">
          <div className="bg-gray-800 p-6 relative rounded-md max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <IoClose
              className="text-white absolute top-1 right-1 text-3xl cursor-pointer"
              onClick={() => setShowSummary(false)}
            />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Dispatch Summary
            </h2>

            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-md font-semibold text-white">
                  Buyer: {customer}
                </h3>
                <h3 className="text-sm font-semibold text-white">
                  Date: {date}
                </h3>
              </div>
              <h3 className="text-md text-white mb-2">Items Dispatched:</h3>
              <div className="bg-gray-700 rounded p-3">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="mb-2 pb-2 border-b border-gray-600 last:border-0"
                  >
                    <p className="text-white">{product.itemName}</p>
                    <div className="flex justify-between gap-2 mt-1">
                      <p className="text-gray-300">
                        <span className="text-gray-400">Rate:</span> Rs.{" "}
                        {product.price}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-400">Qty:</span>{" "}
                        {product.quantity}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-400">Total:</span> Rs.{" "}
                        {product.totalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded mb-4">
              <p className="text-white text-xl flex justify-between">
                Total Dispatch Value:
                <span>
                  Rs.{" "}
                  {products
                    .reduce((acc, product) => acc + product.totalPrice, 0)
                    .toLocaleString("en-IN")}
                </span>
              </p>
            </div>
            <div className="text-white text-md flex gap-5">
              <div>
                <input
                  type="radio"
                  id="cash"
                  value="cash"
                  name="cashorcredit"
                  onChange={handleRadioChange}
                />{" "}
                <label htmlFor="cash">Cash</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="credit"
                  value="credit"
                  name="cashorcredit"
                  onChange={handleRadioChange}
                />{" "}
                <label htmlFor="credit">Credit</label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                onClick={() => setShowSummary(false)}
              >
                Edit
              </button>

              <button
                className={`px-4 py-2 bg-green-700 ${
                  loading || !payment
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:bg-green-600"
                }  text-white rounded-lg`}
                onClick={handleConfirmDispatch}
                disabled={loading || !payment}
              >
                {loading ? (
                  "loading..."
                ) : (
                  <span className="flex items-center gap-1">
                    Confirm Dispatch <GiConfirmed />{" "}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------- summary end ---------- */}

      <h1 className="text-4xl mb-5 font-semibold text-white drop-shadow-xl">
        PRODUCT DISPATCH 🚚
      </h1>
      <div className="w-fit bg-gray-800 p-5 rounded-md">
        <form>
          {/* -------- Customer Name Input --------- */}
          <div className="w-fit mb-5 flex items-center gap-5">
            <div>
              <label className="text-sm text-gray-300">Buyer</label>
              <select
                id="countries"
                className="bg-gray-700 border border-gray-500 text-gray-300 text-sm rounded-lg w-full py-1 px-2"
                onChange={(e) => {
                  if (e.target.value === "SELECT CUSTOMER*") {
                    return;
                  }
                  setCustomer(e.target.value);
                  setCustomerAddress(() => {
                    const temp = customersData.find(
                      (item) => item.businessName === e.target.value
                    );
                    return temp.address;
                  });
                }}
                value={customer}
              >
                <option>SELECT CUSTOMER*</option>
                {customersData.map((item, index) => (
                  <option key={index} value={item.businessName}>
                    {item.businessName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300">Date</label>
              <input
                type="date"
                className="bg-gray-700 border border-gray-500 text-gray-300 text-sm rounded-lg w-full py-1 px-2"
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* --------- Products ---------- */}
          {products.map((item) => (
            <SubForm
              key={item.id}
              formIndex={item.id}
              setProducts={setProducts}
              removeFormRow={(id) =>
                setProducts((prev) => prev.filter((item) => item.id !== id))
              }
            />
          ))}

          <button
            className="text-sm px-3 py-1 bg-gray-700 active:bg-gray-500 cursor-pointer mt-3 border border-gray-500 rounded-lg text-white"
            type="button"
            onClick={() => {
              setProducts((prev) => [
                ...prev,
                {
                  id: nextId,
                  price: 0,
                  quantity: 0,
                  totalPrice: 0,
                  itemName: "",
                },
              ]);
              setNextId((prev) => prev + 1);
            }}
          >
            Add Product
          </button>
        </form>
      </div>
      <button
        type="button"
        onClick={() => setShowSummary(true)}
        className={`${
          products.find((item) => item.itemName === "") || !customer
            ? "cursor-not-allowed"
            : "cursor-pointer active:bg-green-500 "
        } text-sm block px-3 py-2 bg-green-700  mt-2 border border-gray-700 rounded-lg text-white`}
        disabled={products.find((item) => item.itemName === "") || !customer}
      >
        Show Summary
      </button>
    </div>
  );
};

export default DispatchProduct;
