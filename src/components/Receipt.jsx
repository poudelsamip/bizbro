import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";

const Receipt = ({
  products,
  setShowReceipt,
  customer,
  customerAddress,
  resetForm,
}) => {
  const pdfRef = useRef();

  const handlePdfDownload = async () => {
    const element = pdfRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      backgroundColor: "white",
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth - 20; //20px margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(data, "PNG", 10, 10, imgWidth, imgHeight);

    pdf.save("invoice.pdf");
  };

  const giveDate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric", // "2025"
      month: "short", // "March"
      day: "numeric", // "14"
    });
    return formattedDate;
  };

  return (
    <div className="z-10 fixed inset-0 backdrop-blur-xs text-white">
      <div className="max-w-[80vw] w-fit mx-auto h-full bg-white p-6 rounded-lg shadow-lg relative">
        <IoClose
          className="text-black absolute top-0 right-[-30px] text-3xl cursor-pointer"
          onClick={() => {
            setShowReceipt(false);
            resetForm();
          }}
        />
        <div ref={pdfRef} className="px-10">
          <div>
            <h1 className="text-xl font-semibold text-black text-center">
              ABC TECH STORE
            </h1>
            <p className="text-center text-black text-sm">
              123 Jane Street, SanFransisco, California
            </p>
            <h1 className="text-lg font-semibold text-black text-center my-4">
              Invoice
            </h1>
          </div>
          <div className="flex justify-between gap-25">
            <div>
              <p className="text-sm font-medium text-black">
                Bill to: <span className="font-semibold">{customer}</span>
              </p>
              <p className="text-sm font-medium text-black">
                Address:{" "}
                <span className="font-semibold">{customerAddress}</span>
              </p>
            </div>
            <p className="text-sm font-medium text-black">Date: {giveDate()}</p>
          </div>
          <div className="mt-6">
            <table className="w-full border-collapse">
              <thead className="text-black">
                <tr>
                  <th className="px-3 py-3 text-left border-b text-sm">SN</th>
                  <th className="px-3 py-3 text-left border-b text-sm">
                    Product
                  </th>
                  <th className="px-3 py-3 text-left border-b text-sm">Qty</th>
                  <th className="px-3 py-3 text-left border-b text-sm">Rate</th>
                  <th className="px-3 py-3 text-left border-b text-sm">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                {products.map((item, index) => (
                  <tr key={index}>
                    <td className="px-3 py-3 border-b text-sm">{index + 1}</td>
                    <td className="px-3 py-3 border-b text-sm">
                      {item.itemName}
                    </td>
                    <td className="px-3 py-3 border-b text-sm">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-3 border-b text-sm">{item.price}</td>
                    <td className="px-3 py-3 border-b text-sm">
                      {item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="mt-10 text-sm px-3 py-2 bg-black active:bg-black cursor-pointer border border-black rounded text-white"
            type="button"
            onClick={handlePdfDownload}
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
