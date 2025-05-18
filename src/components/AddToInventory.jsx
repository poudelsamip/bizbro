import React, { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addProductsToInventory } from "../store/inventorySlice";
import { addTransactionsToTransactions } from "../store/transactionsSlice";
import { updateSupplierCredit } from "../store/suppliersSlice";

const AddToInventory = ({ onClose }) => {
  // const { addProductsToInventory, fetchData, user } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    id: "",
    itemName: "",
    costPrice: 0,
    sellingPrice: 0,
    quantity: 1,
    supplier: "",
    category: "",
    paymentMethod: "cash" // default to cash
  });
  const suppliersData = useSelector((state) => state.suppliers.suppliersData);
  const [showSummary, setShowSummary] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async () => {
    const isValid =
      item.id &&
      item.itemName &&
      item.costPrice > 0 &&
      item.sellingPrice > 0 &&
      item.quantity > 0 &&
      item.supplier &&
      item.category &&
      item.paymentMethod;

    if (isValid) {
      setShowSummary(true);
    } else {
      alert("Please fill all required fields for the item");
    }
  };

  const calculateTotalCost = () => item.costPrice * item.quantity;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Add to inventory
      await dispatch(addProductsToInventory(item)).unwrap();

      const totalAmount = calculateTotalCost();
      const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (item.paymentMethod === "cash") {
        // Add to transactions if cash payment
        await dispatch(addTransactionsToTransactions({
          type: "expense",
          amount: totalAmount,
          date: date,
          description: `Purchased ${item.quantity} units of ${item.itemName} from ${item.supplier}`,
          buyer: item.supplier
        })).unwrap();
      } else {
        // Add to supplier's credit if credit payment
        await dispatch(updateSupplierCredit({
          supplierName: item.supplier,
          amount: totalAmount
        })).unwrap();
      }

      setShowSummary(false);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error in handleConfirm:", error);
      setLoading(false);
      alert("An error occurred while processing the transaction");
    }
  };

  return (
    <div className="h-full">
      {showSummary && (
        <div className="fixed inset-0 bg-gray-600 flex items-center justify-center z-10">
          <div className="bg-gray-800 p-6  max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Inventory Addition Summary
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Item Added:
              </h3>
              <div className="bg-gray-700  p-3">
                <p className="text-white">
                  <span className="font-medium">Item:</span> {item.itemName}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <p className="text-gray-300">
                    <span className="text-gray-400">Category:</span>{" "}
                    {item.category}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Supplier:</span>{" "}
                    {item.supplier}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Cost:</span> Rs.{" "}
                    {item.costPrice}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Sell:</span> Rs.{" "}
                    {item.sellingPrice}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Qty:</span> {item.quantity}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Total:</span> Rs.{" "}
                    {calculateTotalCost()}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Payment:</span>{" "}
                    {item.paymentMethod === "cash" ? "Cash" : "Credit"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-3  mb-4">
              <p className="text-white text-xl font-medium">
                Total Investment: Rs.{" "}
                {calculateTotalCost().toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-700 text-white  hover:bg-gray-600"
                onClick={() => setShowSummary(false)}
              >
                Edit
              </button>
              <button
                className={`px-4 py-2 ${
                  loading
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-green-700 cursor-pointer"
                }  text-white  hover:bg-green-600`}
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "loading..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-semibold text-white drop-shadow-xl">
          ADD TO INVENTORY
        </h1>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white  hover:bg-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <IoArrowBack /> Back to Inventory
        </button>
      </div>

      <div className="w-full max-w-6xl">
        <form>
          <div>
            <label className="text-xs text-gray-300">Product ID</label>
            <input
              type="text"
              name="id"
              className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
              value={item.id}
              onChange={handleChange}
              placeholder="Enter Product ID"
            />
          </div>

          <div>
            <label className="text-xs text-gray-300">Item Name</label>
            <input
              type="text"
              name="itemName"
              className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
              value={item.itemName}
              onChange={handleChange}
              placeholder="Enter Item Name"
            />
          </div>
          <div>
            <label className="text-xs text-gray-300">Category</label>
            <input
              type="text"
              name="category"
              className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
              value={item.category}
              onChange={handleChange}
              placeholder="Enter Category"
            />
          </div>

          <div>
            <label className="text-xs text-gray-300">Cost Price</label>
            <input
              type="number"
              name="costPrice"
              className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
              value={item.costPrice || ""}
              placeholder="Cost price"
              min={1}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xs text-gray-300">Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
              value={item.sellingPrice || ""}
              min={1}
              placeholder="Selling Price"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xs text-gray-300">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
              value={item.quantity || ""}
              min={1}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs text-gray-300">Supplier</label>
            <select 
              name="supplier"
              value={item.supplier}
              onChange={handleChange}
              className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm w-full py-2 px-3"
            >
              <option value="">SELECT SUPPLIER*</option>
              {suppliersData.map((item, index) => (
                <option key={index} value={item.suppliersName}>
                  {item.suppliersName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-300">Payment Method</label>
            <div className="flex gap-4 mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={item.paymentMethod === "cash"}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-white">Cash</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={item.paymentMethod === "credit"}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-white">Credit</span>
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="max-w-[300px] mt-5 text-sm px-4 py-2 bg-green-600 active:bg-green-700 cursor-pointer border border-gray-500 text-white w-full"
          >
            Add to Inventory
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToInventory;
