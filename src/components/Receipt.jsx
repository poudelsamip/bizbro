import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../Context/MainProvider";
import { toWords } from "number-to-words";

const Receipt = ({
  products,
  setShowReceipt,
  customer,
  customerAddress,
  resetForm,
  totalAmount,
  date,
}) => {
  const { currentUserName } = useContext(MainContext);

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

    page.drawText(`Date: ${formattedDate}`, {
      x: 50,
      y,
      size: fontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= 40;
    page.drawText(currentUserName, {
      x: 50,
      y,
      size: 18,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= 30;
    page.drawText("Invoice", {
      x: 50,
      y,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
    page.drawText(`Bill to: ${customer}`, { x: 50, y, size: fontSize });
    y -= 15;
    page.drawText(`Address: ${customerAddress}`, { x: 50, y, size: fontSize });
    y -= 40;

    const headers = ["SN", "Product", "Qty", "Rate", "Total"];
    const columnWidths = [40, 200, 60, 80, 80];
    let x = 50;

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
    y -= 20;

    products.forEach((item, index) => {
      x = 50;
      const rowData = [
        index + 1,
        item.itemName,
        item.quantity,
        `Rs.${item.price}`,
        `Rs.${item.totalPrice}`,
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
      y -= 20;
    });

    y -= 20;
    page.drawText("Total Amount: ", {
      x: 50,
      y,
      size: fontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Rs. ${totalAmount.toLocaleString("en-IN")}`, {
      x: 430,
      y,
      size: fontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
    page.drawText(`In Words: ${toWords(totalAmount)} only`, {
      x: 50,
      y,
      size: fontSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const downloadName = `${
      new Date(date).toISOString().split("T")[0] + " - " + customer
    }`;
    saveAs(blob, downloadName);
  };

  return (
    <div className="z-11 fixed inset-0 backdrop-blur-xs text-white">
      <div className="max-w-[50vw]  mx-auto h-full bg-white p-6 rounded-lg shadow-lg relative">
        <IoClose
          className="text-white absolute top-0 right-[-30px] text-3xl cursor-pointer"
          onClick={() => {
            setShowReceipt(false);
            resetForm();
          }}
        />
        <div className="px-5">
          <p className="text-sm font-medium text-black mb-5">
            Date:{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <h1 className="text-2xl font-bold text-black">{currentUserName}</h1>
          <h1 className="text-xl font-semibold text-black mt-4">Invoice</h1>
          <p className="text-sm font-medium text-black">
            Bill to: <span className="font-semibold">{customer}</span>
          </p>
          <p className="text-sm font-medium text-black">
            Address: <span className="font-semibold">{customerAddress}</span>
          </p>
          <div className="mt-6">
            <table className="w-full border-collapse table-auto">
              <thead className="text-black">
                <tr>
                  <th className="py-2 text-left text-sm">SN</th>
                  <th className="px-3 py-2 text-left text-sm w-full">
                    Product
                  </th>
                  <th className="px-3 py-2 text-left text-sm">Qty</th>
                  <th className="px-3 py-2 text-left text-sm">Rate</th>
                  <th className="px-3 py-2 text-left text-sm">Total</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {products.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2  text-sm">{index + 1}</td>
                    <td className="px-3 py-2 text-nowrap text-sm">
                      {item.itemName}
                    </td>
                    <td className="px-3 py-2 text-nowrap text-sm">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-2 text-nowrap text-sm">
                      Rs. {item.price}
                    </td>
                    <td className="px-3 py-2 text-nowrap text-sm">
                      Rs. {item.totalPrice}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="py-2 text-sm font-bold">
                    Total Amount
                  </td>
                  <td></td>
                  <td></td>
                  <td className="px-3 py-2 text-md text-nowrap font-bold">
                    Rs. {totalAmount.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-black text-sm font-semibold mt-5">
              In Words : {toWords(totalAmount)} only
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="mt-10 text-sm px-3 py-2 bg-black active:bg-gray-700 cursor-pointer border border-black rounded text-white"
            type="button"
            onClick={generatePdf}
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
