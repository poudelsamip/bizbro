import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const DispatchSummary = () => {
  return (
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
          <h3 className="text-md font-semibold text-white">
            Buyer: {customer}
          </h3>
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
  );
};

export default DispatchSummary;
