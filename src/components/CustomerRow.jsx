import React from "react";
import { GiReceiveMoney } from "react-icons/gi";

const CustomerRow = ({ item, setShowReceivePayment, setSelectedCustomer }) => {
  return (
    <tr className="cursor-pointer border-b bg-gray-800 border-gray-500  hover:bg-gray-700">
      <td className="px-3 py-3">{item.id}</td>
      <th scope="row" className="px-3 py-3 font-medium  whitespace-nowrap">
        {item.businessName}
      </th>
      <td className="px-3 py-3">{item.address}</td>
      <td className="px-3 py-3">{item.contactNumber}</td>
      <td className="px-3 py-3">{item.email}</td>
      <td className="px-3 py-3">
        Rs. {item.outstandingBalance.toLocaleString("en-IN")}
      </td>
      <td className="px-3 py-3">
        <div title="Receive Payment" className="font-medium">
          <GiReceiveMoney
            size={20}
            className="text-green-500"
            onClick={() => {
              setSelectedCustomer(item);
              setShowReceivePayment(true);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;
