import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../Context/MainProvider";

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
    page.drawText(`Rs. ${totalAmount}`, {
      x: 430,
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
      <div className="max-w-[80vw] w-fit mx-auto h-full bg-white p-6 rounded-lg shadow-lg relative">
        <IoClose
          className="text-black absolute top-0 right-[-30px] text-3xl cursor-pointer"
          onClick={() => {
            setShowReceipt(false);
            resetForm();
          }}
        />
        <div className="px-10">
          <p className="text-sm font-medium text-black text-right">
            Date: {new Date(date).toLocaleDateString()}
          </p>
          <h1 className="text-2xl font-bold text-black text-center">
            {currentUserName}
          </h1>
          <h1 className="text-lg font-semibold text-black text-center mb-2">
            Invoice
          </h1>
          <p className="text-sm font-medium text-black">
            Bill to: <span className="font-semibold">{customer}</span>
          </p>
          <p className="text-sm font-medium text-black">
            Address: <span className="font-semibold">{customerAddress}</span>
          </p>
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
                    <td className="px-3 py-3 border-b text-sm">
                      Rs. {item.price}
                    </td>
                    <td className="px-3 py-3 border-b text-sm">
                      Rs. {item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-right text-black font-bold mt-4">
            Total Amount: Rs. {totalAmount}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="mt-10 text-sm px-3 py-2 bg-black active:bg-black cursor-pointer border border-black rounded text-white"
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
