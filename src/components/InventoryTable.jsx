import React, { useContext, useState, useEffect, useRef } from "react";

import { MdAddHomeWork } from "react-icons/md";
import TableRow from "./TableRow"; // Table row component to display individual product
import AddToInventory from "./AddToInventory"; // Form to add new products
import { MainContext } from "../Context/MainProvider";

const InventoryTable = () => {
  // Access inventory data from context
  const { inventoryData, addStock, fetchData, user } = useContext(MainContext);

  // Local state to handle filtered products based on search
  const [filteredProducts, setFilteredProducts] = useState(inventoryData);
  const [showAddProduct, setShowAddProduct] = useState(false); // State to toggle Add Product form
  const [showAddStockPopup, setShowAddStockPopup] = useState(false); // State to toggle Add Stock popup
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item for adding stock
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState();

  // Update filtered products whenever inventory data changes
  useEffect(() => {
    setFilteredProducts(inventoryData); // Set filtered products to the current inventory data
  }, [inventoryData]);

  // Handle the search input to filter products
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const tempData = inventoryData.filter((item) =>
      item.itemName.toLowerCase().includes(searchText)
    );
    setFilteredProducts(tempData); // Update filtered products based on search
  };

  // Handle adding stock to the selected product
  const handleAddStock = async () => {
    setLoading(true);
    const quantityToAdd = document.getElementById("quantityToAdd");
    await addStock(
      selectedItem.itemName,
      Number(selectedItem.quantity - quantityToAdd)
    );
    await fetchData(user.email);
    setShowAddStockPopup(false); // Close the popup after adding stock
    setLoading(false);
  };

  // If the Add Product form is being shown, return that form instead of the table
  if (showAddProduct) {
    return <AddToInventory onClose={() => setShowAddProduct(false)} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header & Search Bar */}
      <div className="flex-none">
        <h1 className="text-4xl font-semibold text-white mb-2 drop-shadow-xl">
          INVENTORY 🏬
        </h1>
        <div className="flex justify-between items-center mb-1">
          <div className="max-w-md">
            <input
              type="text"
              className="block w-full px-4 py-2 text-white text-sm border border-gray-400 bg-gray-800 rounded outline-0"
              placeholder="Search Products"
              onChange={(e) => handleSearch(e)} // Handle search input
            />
          </div>
          <div>
            <button
              className="border bg-green-500 py-1 px-2 rounded inline-flex items-center gap-2 cursor-pointer active:bg-green-600"
              onClick={() => setShowAddProduct(!showAddProduct)} // Toggle Add Product form visibility
            >
              Add New Product <MdAddHomeWork size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className="flex-grow overflow-auto max-h-[80vh]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-900 text-gray-200 border-b border-white sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-3 py-3">
                Id
              </th>
              <th scope="col" className="px-3 py-3">
                Product name
              </th>
              <th scope="col" className="px-3 py-3">
                Category
              </th>
              <th scope="col" className="px-3 py-3">
                Stock
              </th>
              <th scope="col" className="px-3 py-3">
                Cost Price
              </th>
              <th scope="col" className="px-3 py-3">
                Selling Price
              </th>
              <th scope="col" className="px-3 py-3">
                Supplier
              </th>
              <th scope="col" className="px-3 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <TableRow
                  key={index}
                  item={item}
                  setShowAddStockPopup={setShowAddStockPopup} // Pass function to open Add Stock popup
                  setSelectedItem={setSelectedItem}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Simple Popup for Adding Stock */}
      {showAddStockPopup && (
        <div className="fixed inset-0 bg-gray-700 flex items-center justify-center z-10">
          <div className="bg-gray-800 p-6 max-w-sm w-full">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Add Stock to {selectedItem?.itemName}
            </h2>
            <div className="mb-4">
              <label className="text-white">Enter Quantity to Add:</label>
              <input
                type="number"
                min={1}
                className="w-full p-2 text-gray-300 bg-gray-600 rounded-md"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              {!inputData && (
                <label className="text-red-500 text-sm">
                  Enter a valid quantity
                </label>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                onClick={() => {
                  setInputData(null);
                  setShowAddStockPopup(false);
                }} // Close the popup
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-green-700 text-white rounded-lg ${
                  loading || !inputData
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:bg-green-600"
                } `}
                onClick={handleAddStock}
                disabled={loading || !inputData}
              >
                {loading ? "Loading ..." : "Add Stock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
