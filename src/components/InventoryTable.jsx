import React, { useContext, useState, useEffect } from "react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdAddHomeWork } from "react-icons/md";
import TableRow from "./TableRow";
import AddToInventory from "./AddToInventory";
import { MainContext } from "../Context/MainProvider";

const InventoryTable = () => {
  const { inventoryData, addStock, fetchData, user } = useContext(MainContext);

  const [filteredProducts, setFilteredProducts] = useState(inventoryData);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddStockPopup, setShowAddStockPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState(""); // Initialize with empty string

  const [sortedByQuantity, setSortedByQuantity] = useState("default");
  const [sortedByPrice, setSortedByPrice] = useState("default");

  useEffect(() => {
    setFilteredProducts(inventoryData);
  }, [inventoryData]);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const tempData = inventoryData.filter((item) =>
      item.itemName.toLowerCase().includes(searchText)
    );
    setFilteredProducts(tempData);
  };

  const handleAddStock = async () => {
    setLoading(true);
    // Use inputData state instead of DOM access, and fix the calculation
    await addStock(
      selectedItem.itemName,
      Number(selectedItem.quantity) + Number(inputData)
    );
    await fetchData(user.email);
    setShowAddStockPopup(false);
    setInputData(""); // Reset input data
    setLoading(false);
  };

  const sortByQuantity = () => {
    if (sortedByQuantity === "default") {
      setFilteredProducts(
        [...inventoryData].sort((a, b) => a.quantity - b.quantity)
      );
      setSortedByQuantity("low-high");
    } else if (sortedByQuantity === "low-high") {
      setFilteredProducts(
        [...inventoryData].sort((a, b) => b.quantity - a.quantity)
      );
      setSortedByQuantity("high-low");
    } else {
      setFilteredProducts(inventoryData);
    }
  };

  const sortByPrice = () => {
    if (sortedByPrice === "default") {
      setFilteredProducts(
        [...inventoryData].sort((a, b) => a.costPrice - b.costPrice)
      );
      setSortedByPrice("low-high");
    } else if (sortedByQuantity === "low-high") {
      setFilteredProducts(
        [...inventoryData].sort((a, b) => b.costPrice - a.costPrice)
      );
      setSortedByQuantity("high-low");
    } else {
      setFilteredProducts(inventoryData);
      setSortedByPrice("default");
    }
  };

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
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div>
            <button
              className="border bg-green-500 py-1 px-2 rounded inline-flex items-center gap-2 cursor-pointer active:bg-green-600"
              onClick={() => setShowAddProduct(!showAddProduct)}
            >
              Add New Product <MdAddHomeWork size={20} />
            </button>
          </div>
        </div>
      </div>

      {/*  Table*/}
      {inventoryData.length > 0 ? (
        <>
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
                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      title="Sort By Quantity"
                      onClick={sortByQuantity}
                    >
                      Stock <RiExpandUpDownFill />
                    </span>
                  </th>
                  <th scope="col" className="px-3 py-3">
                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      title="Sort By Cost Price"
                      onClick={sortByPrice}
                    >
                      Cost Price <RiExpandUpDownFill />
                    </span>
                  </th>
                  <th scope="col" className="px-3 py-3">
                    <span
                      className="flex items-center gap-1 cursor-pointer"
                      title="Sort By Selling Price"
                      onClick={sortByPrice}
                    >
                      Selling Price <RiExpandUpDownFill />
                    </span>
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
                      setShowAddStockPopup={setShowAddStockPopup}
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

          {/* Popup for Adding Stock */}
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
                      setInputData(""); // Reset to empty string instead of null
                      setShowAddStockPopup(false);
                    }}
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
        </>
      ) : (
        <div className="text-gray-400 text-center mt-10">
          Your Products Will Be Displayed Here
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
