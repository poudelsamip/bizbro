import React, { useState } from "react";
import SubForm from "../components/SubForm";
import Receipt from "../components/Receipt";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionsToTransactions } from "../store/transactionsSlice";
import { fetchData } from "../store/dataSlice";
import { addPurchaseToPurchases } from "../store/purchaseSlice";
import { updateStock } from "../store/inventorySlice";

const AddPurchase = () => {
  const [supplier, setSupplier] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [payment, setPayment] = useState();

  const dispatch = useDispatch();
  const [totalBillAmount, setTotalBillAmount] = useState(0);

  const { suppliersData } = useSelector((state) => state.suppliers);

  const resetForm = () => {
    setSupplier("");
    setSupplierAddress("");
    setProducts([]);
    setNextId(1);
    setDate(today);
    setPayment(undefined);
  };

  const handleRadioChange = (e) => {
    setPayment(e.target.value);
  };

  const handleConfirmPurchase = async () => {
    if (products.length === 0) {
      alert("Please add at least one product");
      return;
    }

    setLoading(true);

    const totalAmount = products.reduce(
      (acc, product) => acc + product.totalPrice,
      0
    );
    setTotalBillAmount(totalAmount);
    let purchasedItems = [];
    products.map((item) => purchasedItems.push(item));

    try {
      if (payment === "cash") {
        const item = {
          date: new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          supplier: supplier,
          totalAmount: totalAmount,
          type: "paid",
        };
        await dispatch(addTransactionsToTransactions(item)).unwrap();
      }

      await Promise.all([
        dispatch(addPurchaseToPurchases({ 
          items: products, 
          supplier, 
          date,
          paymentType: payment 
        })).unwrap(),
        dispatch(updateStock(purchasedItems)),
      ]);
      await dispatch(fetchData()).unwrap();
      setShowSummary(false);
      setLoading(false);
      setShowReceipt(true);
    } catch (error) {
      setLoading(false);
      alert("Error processing purchase: " + error.message);
    }
  };

  return (
    <div className="h-full">
      {showReceipt && (
        <Receipt
          products={products}
          setShowReceipt={setShowReceipt}
          supplier={supplier}
          supplierAddress={supplierAddress}
          resetForm={resetForm}
          totalAmount={totalBillAmount}
          date={date}
          isPurchase={true}
        />
      )}

      {showSummary && (
        <div className="fixed inset-0 bg-gray-700 flex items-center justify-center z-10">
          <div className="bg-gray-800 p-6 relative max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <IoClose
              className="text-white absolute top-1 right-1 text-3xl cursor-pointer"
              onClick={() => setShowSummary(false)}
            />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Purchase Summary
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Supplier Details:
              </h3>
              <div className="bg-gray-700 p-3">
                <p className="text-white">
                  <span className="font-medium">Business Name:</span> {supplier}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Address:</span>{" "}
                  {supplierAddress}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Products Details:
              </h3>
              <div className="bg-gray-700 p-3">
                {products.map((product, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-white">
                      <span className="font-medium">Item:</span>{" "}
                      {product.itemName}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Quantity:</span>{" "}
                      {product.quantity}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Price:</span> Rs.{" "}
                      {product.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Total:</span> Rs.{" "}
                      {product.totalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Payment Method:
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="cash"
                    checked={payment === "cash"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="text-white">Cash</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="credit"
                    checked={payment === "credit"}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="text-white">Credit</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleConfirmPurchase}
                disabled={!payment || loading}
                className={`flex items-center gap-1 px-4 py-2 ${
                  !payment || loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded`}
              >
                <GiConfirmed />
                {loading ? "Processing..." : "Confirm Purchase"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-800 p-4 mb-4">
        <h2 className="text-xl font-semibold text-white mb-4">Add Purchase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Select Supplier
            </label>
            <select
              value={supplier}
              onChange={(e) => {
                setSupplier(e.target.value);
                const selectedSupplier = suppliersData.find(
                  (s) => s.name === e.target.value
                );
                setSupplierAddress(selectedSupplier?.address || "");
              }}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a supplier</option>
              {suppliersData.map((supplier) => (
                <option key={supplier.id} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Purchase Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <SubForm
            key={product.id}
            formIndex={product.id}
            setProducts={setProducts}
            removeFormRow={(id) =>
              setProducts((prev) => prev.filter((item) => item.id !== id))
            }
            selectedSupplier={supplier}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => {
            setProducts([...products, { 
              id: nextId,
              itemName: "",
              price: 0,
              quantity: 0,
              totalPrice: 0
            }]);
            setNextId(nextId + 1);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Product
        </button>
        <button
          onClick={() => setShowSummary(true)}
          disabled={!supplier || products.length === 0}
          className={`px-4 py-2 ${
            !supplier || products.length === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded`}
        >
          Review Purchase
        </button>
      </div>
    </div>
  );
};

export default AddPurchase; 