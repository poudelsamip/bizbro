import React from "react";
import { RiBankLine } from "react-icons/ri";

const SuppliersRow = ({ item, setShowDoPayment, setSelectedSupplier }) => {
  return (
    <tr className="cursor-pointer border-b bg-gray-800 border-gray-500  hover:bg-gray-700">
      <td className="px-3 py-3">{item.id}</td>
      <th scope="row" className="px-3 py-3 font-medium  whitespace-nowrap">
        {item.suppliersName}
      </th>
      <td className="px-3 py-3">{item.contactNumber}</td>
      <td className="px-3 py-3">{item.email}</td>
      <td className="px-3 py-3">Rs. {item.credit.toLocaleString("en-IN")}</td>
      <td className="px-3 py-3">
        <div title="Pay Supplier" className="font-medium">
          <RiBankLine
            size={20}
            className="text-green-500"
            onClick={() => {
              setSelectedSupplier(item);
              setShowDoPayment(true);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default SuppliersRow;
