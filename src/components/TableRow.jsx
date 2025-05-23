import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddToPhotos } from "react-icons/md";

const TableRow = ({ item, setShowAddStockPopup, setSelectedItem }) => {
  return (
    <tr className="cursor-pointer border-b bg-gray-800 border-gray-500 hover:bg-gray-700">
      <td className="px-3 py-3">{item.id}</td>
      <th scope="row" className="px-3 py-3 font-medium whitespace-nowrap">
        {item.itemName}
      </th>
      <td className="px-3 py-3">{item.category}</td>
      <td className="px-3 py-3">{item.quantity}</td>
      <td className="px-3 py-3">
        Rs. {item.costPrice.toLocaleString("en-IN")}.00
      </td>
      <td className="px-3 py-3">
        Rs. {item.sellingPrice.toLocaleString("en-IN")}.00
      </td>
      <td className="px-3 py-3">{item.supplier}</td>
      <td className="px-3 py-3">
        <div title="Add Stock" className="font-medium flex gap-3">
          <MdOutlineAddToPhotos
            size={20}
            className="text-green-500 cursor-pointer"
            onClick={() => {
              setSelectedItem(item);
              setShowAddStockPopup(true);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
