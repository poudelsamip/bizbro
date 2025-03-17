import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../Context/MainProvider";

const SubForm = ({ formIndex, removeFormRow, setProducts }) => {
  const { inventoryData } = useContext(MainContext);

  const [currentProduct, setCurrentProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const productId = `product-${formIndex}`;
  const quantityId = `quantity-${formIndex}`;
  const priceId = `price-${formIndex}`;
  const totalId = `total-${formIndex}`;

  const selectedItem = inventoryData.find(
    (item) => item.itemName === currentProduct
  );
  const availableStock = selectedItem ? selectedItem.quantity : 0;
  const isStockInsufficient = quantity > availableStock;

  const handleProductChange = (e) => {
    const productName = e.target.value;
    setCurrentProduct(productName);

    if (productName === "SELECT PRODUCT*") {
      setPrice(0);
      setTotalPrice(0);
      return;
    }

    const temp = inventoryData.find((item) => item.itemName === productName);

    if (temp) {
      setPrice(temp.sellingPrice);
      setTotalPrice(temp.sellingPrice * quantity);
    } else {
      setPrice(0);
      setTotalPrice(0);
      setCurrentProduct("");
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    setTotalPrice(price * quantity);

    setProducts((prev) =>
      prev.map((item) =>
        item.id === formIndex
          ? {
              ...item,
              itemName: currentProduct,
              price,
              quantity,
              totalPrice: price * quantity,
            }
          : item
      )
    );
  }, [price, quantity, currentProduct]);

  return (
    <div className="flex items-end gap-5 mb-2 flex-nowrap">
      <div className="min-w-[200px]">
        <label htmlFor={productId} className="text-xs text-gray-300">
          Product
        </label>
        <select
          id={productId}
          className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg w-full py-1 px-2"
          value={currentProduct}
          onChange={handleProductChange}
        >
          <option>SELECT PRODUCT*</option>
          {inventoryData.map((item, index) => (
            <option key={index} value={item.itemName}>
              {item.itemName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor={quantityId}
          className="text-xs text-gray-300 flex items-center gap-2"
        >
          Quantity:
          <p
            className={`text-xs ${
              isStockInsufficient ? "text-red-500" : "text-gray-400"
            }`}
          >
            (In Stock: {availableStock})
          </p>
        </label>
        <input
          type="number"
          id={quantityId}
          className="block w-full px-2 py-1 text-white text-sm rounded-lg bg-gray-700 border border-gray-500"
          value={quantity}
          required
          min={1}
          onChange={handleQuantityChange}
        />
      </div>

      <div className="flex-1">
        <label htmlFor={priceId} className="text-xs text-gray-300">
          Price
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <span className="text-gray-400">Rs. </span>
          </div>
          <input
            type="number"
            id={priceId}
            className="block w-full py-1 px-2 ps-10 text-white text-sm rounded-lg bg-gray-700 border border-gray-500"
            value={price || ""}
            required
            min={1}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex-1">
        <label htmlFor={totalId} className="text-xs text-gray-300">
          Total Price
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <span className="text-gray-400">Rs. </span>
          </div>
          <input
            type="number"
            id={totalId}
            className="block w-full py-1 px-2 ps-10 text-white text-sm rounded-lg bg-gray-700 border border-gray-500"
            value={totalPrice || ""}
            required
            min={1}
            readOnly
          />
        </div>
      </div>

      <div>
        <div
          className="bg-gray-700 rounded-full p-1 cursor-pointer mb-1"
          onClick={() => removeFormRow(formIndex)}
        >
          <IoClose size={15} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SubForm;
