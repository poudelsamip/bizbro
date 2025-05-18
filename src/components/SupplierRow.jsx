import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";

const SupplierRow = ({ item, setShowPaymentModal, setSelectedSupplier }) => {
  return (
    <tr className="border-b bg-gray-800 border-gray-500 hover:bg-gray-700">
      <td className="px-3 py-3">{item.id}</td>
      <td className="px-3 py-3">{item.name}</td>
      <td className="px-3 py-3">{item.address}</td>
      <td className="px-3 py-3">{item.phone}</td>
      <td className="px-3 py-3">{item.email}</td>
      <td className="px-3 py-3">
        Rs. {item.outstandingBalance?.toLocaleString("en-IN") || 0}
      </td>
      <td className="px-3 py-3">
        <button
          className="text-blue-500 hover:text-blue-400"
          onClick={() => {
            setSelectedSupplier(item);
            setShowPaymentModal(true);
          }}
        >
          <FaMoneyBillWave />
        </button>
      </td>
    </tr>
  );
};

export default SupplierRow; 