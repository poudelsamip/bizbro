// import React, { useContext } from "react";
// import { MainContext } from "../Context/MainProvider";

// const ThisMonth = () => {
//   const { transactionsData } = useContext(MainContext);

//   const date = new Date();
//   const month = date.toLocaleDateString("default", { month: "long" });
//   let count = 0;
//   let customersPurchaseData = {};

//   const salesThisMonth = transactionsData
//     ? transactionsData.reduce((total, current) => {
//         const transactionMonth = current.date.split(" ")[1];
//         if (month === transactionMonth) {
//           count += 1;
//           total = total + current.grandTotal;
//         }
//         if (customersPurchaseData[current.customer]) {
//           customersPurchaseData[current.customer] += current.grandTotal;
//         } else {
//           customersPurchaseData[current.customer] = current.grandTotal;
//         }
//         return total;
//       }, 0)
//     : 0;

//   return (
//     <div className="mt-5 grid grid-cols-[1fr_1fr] gap-8">
//       <div className="w-full bg-gray-800 p-4">
//         <h1 className="text-2xl text-white">
//           Sales this month : Rs. {salesThisMonth}
//         </h1>
//       </div>
//       <div className="w-full bg-gray-800 p-4">
//         <h1 className="text-2xl text-white">Dispatch this month : {count}</h1>
//       </div>
//       <div className="w-full bg-gray-800 p-4">
//         <h1 className="text-2xl text-white">Top Buyers</h1>
//         <table>
//           <th>
//             <td>Buyer</td>
//             <td>Total Amount</td>
//           </th>

//           {Object.fromEntries(customersPurchaseData)
//             .sort((a, b) => b[1] - a[1])
//             .map((item, index) => (
//               <tr key={index}>
//                 <td>{item[0]}</td>
//                 <td>{item[1]}</td>
//               </tr>
//             ))}
//         </table>
//       </div>
//       <div className="w-full bg-gray-800 p-4">
//         <h1 className="text-2xl text-white">Dispatch this month : {count}</h1>
//       </div>
//     </div>
//   );
// };
ss;
// export default ThisMonth;
