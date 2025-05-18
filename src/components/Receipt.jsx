import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import React from "react";
import { IoClose } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toWords } from "number-to-words";

const Receipt = ({
  products,
  setShowReceipt,
  customer,
  customerAddress,
  resetForm,
  totalAmount,
  date,
  isPurchase = false,
}) => {
  const companyName = useSelector((state) => state.data.companyName);

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const fontSize = 12;
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let y = height - 50;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Company Header
    page.drawText(companyName, {
      x: 50,
      y: height - 50,
      size: 24,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Invoice Title & Date
    page.drawText(`${isPurchase ? 'PURCHASE' : 'SALES'} INVOICE`, {
      x: 50,
      y: height - 90,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Date: ${formattedDate}`, {
      x: width - 200,
      y: height - 90,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    // Customer/Supplier Details
    y = height - 140;
    page.drawText(`${isPurchase ? 'Supplier' : 'Customer'} Details:`, {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= 25;
    page.drawText(`Name: ${customer}`, { x: 50, y, size: fontSize });
    y -= 20;
    page.drawText(`Address: ${customerAddress}`, { x: 50, y, size: fontSize });
    y -= 40;

    // Table Headers
    const headers = ["SN", "Product", "Qty", "Rate", "Total"];
    const columnWidths = [40, 200, 60, 80, 80];
    let x = 50;

    // Draw table header background
    page.drawRectangle({
      x: 45,
      y: y - 5,
      width: width - 90,
      height: 25,
      color: rgb(0.9, 0.9, 0.9),
    });

    headers.forEach((header, i) => {
      page.drawText(header, {
        x,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      x += columnWidths[i];
    });
    y -= 30;

    // Table Content
    products.forEach((item, index) => {
      x = 50;
      const rowData = [
        index + 1,
        item.itemName,
        item.quantity,
        `Rs.${item.price.toLocaleString("en-IN")}`,
        `Rs.${item.totalPrice.toLocaleString("en-IN")}`,
      ];
      rowData.forEach((text, i) => {
        page.drawText(String(text), {
          x,
          y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        x += columnWidths[i];
      });
      y -= 25;
    });

    // Total Section
    y -= 20;
    page.drawText("Total Amount:", {
      x: 50,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Rs. ${totalAmount.toLocaleString("en-IN")}`, {
      x: width - 150,
      y,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= 25;
    page.drawText(`Amount in words: ${toWords(totalAmount)} rupees only`, {
      x: 50,
      y,
      size: fontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const downloadName = `${
      new Date(date).toISOString().split("T")[0]
    }_${customer.replace(/\s+/g, "_")}_${isPurchase ? 'Purchase' : 'Sales'}_Invoice.pdf`;
    saveAs(blob, downloadName);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Close Button */}
        <button
          className="absolute -right-7 bg-red-500 text-white p-2 hover:bg-red-600 transition-colors z-50 cursor-pointer"
          onClick={() => {
            setShowReceipt(false);
            resetForm();
          }}
        >
          <IoClose className="text-xl" />
        </button>

        {/* Receipt Modal */}
        <div className="bg-white shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          {/* Receipt Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{companyName}</h1>
              <div className="flex justify-between items-center mt-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isPurchase ? 'PURCHASE INVOICE' : 'SALES INVOICE'}
                </h2>
                <p className="text-gray-800">
                  Date:{" "}
                  {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Customer/Supplier Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPurchase ? 'Supplier' : 'Customer'} Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">
                  <span className="font-medium">Name:</span> {customer}
                </p>
                <p className="text-gray-800 mt-1">
                  <span className="font-medium">Address:</span> {customerAddress}
                </p>
              </div>
            </div>

            {/* Products Table */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">SN</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Qty</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Rate</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                        <td className="py-3 px-4 text-gray-900 font-medium">
                          {item.itemName}
                        </td>
                        <td className="py-3 px-4 text-gray-800">{item.quantity}</td>
                        <td className="py-3 px-4 text-gray-800">
                          Rs. {item.price.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-4 text-gray-900 font-medium">
                          Rs. {item.totalPrice.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Section */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                <span className="text-xl font-bold text-gray-900">
                  Rs. {totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-gray-800 italic">
                Amount in words: {toWords(totalAmount)} rupees only
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          title="Download Invoice"
          onClick={generatePdf}
          className="absolute bottom-0 -right-7 bg-blue-600 text-white p-2 hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <FaDownload className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Receipt;
