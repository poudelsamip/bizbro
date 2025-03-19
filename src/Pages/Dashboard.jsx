import React, { useState, useEffect, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { BiSolidPackage } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { MainContext } from "../Context/MainProvider";

const Dashboard = () => {
  const { salesData, inventoryData, customersData } = useContext(MainContext);

  //current month name
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" }); // e.g., "March"
  const currentMonthShort = currentDate.toLocaleString("en-US", {
    month: "short",
  });

  //current month data
  const currentMonthData = salesData.filter((transaction) =>
    transaction.date.includes(currentMonth)
  );

  //total sales for current month
  const totalSales = currentMonthData.reduce(
    (total, transaction) => total + transaction.grandTotal,
    0
  );

  //total quantity sold for current month
  const totalQuantitySold = currentMonthData.reduce((total, transaction) => {
    return (
      total +
      Object.values(transaction.products).reduce(
        (sum, product) => sum + product.quantity,
        0
      )
    );
  }, 0);

  // most sold item for current month
  const itemSales = {};
  currentMonthData.forEach((transaction) => {
    Object.values(transaction.products).forEach((product) => {
      if (!itemSales[product.itemName]) {
        itemSales[product.itemName] = 0;
      }
      itemSales[product.itemName] += product.quantity;
    });
  });

  const mostSoldItem = Object.entries(itemSales).reduce(
    (max, [item, quantity]) => {
      return quantity > max.quantity ? { item, quantity } : max;
    },
    { item: "", quantity: 0 }
  );

  //sales by customer
  const salesByCustomer = {};
  currentMonthData.forEach((transaction) => {
    if (!salesByCustomer[transaction.customer]) {
      salesByCustomer[transaction.customer] = 0;
    }
    salesByCustomer[transaction.customer] += transaction.grandTotal;
  });

  //biggest customer for current month
  const biggestCustomer = Object.entries(salesByCustomer).reduce(
    (max, [customer, sales]) => {
      return sales > max.sales ? { customer, sales } : max;
    },
    { customer: "", sales: 0 }
  );

  //top 5 customers by sales
  const top5CustomersBySales = Object.entries(salesByCustomer)
    .map(([customer, sales]) => ({ customer, sales }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  //top 5 most sold products
  const top5SoldProducts = Object.entries(itemSales)
    .map(([item, quantity]) => ({ item, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  //top 5 customers with outstanding balance
  const top5OutstandingBalance = [...customersData]
    .sort((a, b) => b.outStandingBalance - a.outStandingBalance)
    .slice(0, 5)
    .map((customer) => ({
      customer: customer.businessName,
      balance: customer.outStandingBalance,
    }));

  //total inventory value
  const totalInventoryValue = inventoryData.reduce((total, item) => {
    return total + item.sellingPrice * item.quantity;
  }, 0);

  //daily sales trend for chart
  const dailySalesTrend = [];

  //filter only current month transactions
  const currentMonthTransactions = salesData.filter((transaction) =>
    transaction.date.includes(currentMonth)
  );
  //extract days only from current month transactions
  const dates = [
    ...new Set(
      currentMonthTransactions.map((transaction) => {
        const dateStr = transaction.date.split(",")[1].trim();
        return dateStr.split(" ")[1];
      })
    ),
  ].sort((a, b) => parseInt(a) - parseInt(b));
  dates.forEach((day) => {
    const dayTransactions = currentMonthTransactions.filter((transaction) =>
      transaction.date.includes(`${currentMonth} ${day}`)
    );
    const daySales = dayTransactions.reduce(
      (total, transaction) => total + transaction.grandTotal,
      0
    );
    dailySalesTrend.push({
      day: `${currentMonthShort} ${day}`,
      sales: daySales,
    });
  });

  //monthly growth
  const prevMonthSales = 45000;
  const monthOverMonthGrowth =
    ((totalSales - prevMonthSales) / prevMonthSales) * 100;

  // chart color for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="p-4 bg-gray-600 min-h-screen">
      <h1 className="text-4xl font-semibold text-white mb-3 drop-shadow-xl">
        DASHBOARD 📊
      </h1>

      {/* Summary Cards */}
      <h1 className="text-md text-gray-50">This Month</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Total Sales</div>
            <div className="p-2 bg-blue-100 rounded-full">
              <TbCurrencyRupeeNepalese className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold">
            Rs.{totalSales.toLocaleString("en-IN")}
          </div>
          <div className="flex items-center mt-2">
            <div
              className={`text-sm ${
                monthOverMonthGrowth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {monthOverMonthGrowth >= 0 ? (
                <FaArrowUp className="h-4 w-4 inline" />
              ) : (
                <FaArrowDown className="h-4 w-4 inline" />
              )}
              {Math.abs(monthOverMonthGrowth).toFixed(1)}% from last month
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">
              Total Quantity Sold
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <BiSolidPackage className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold">
            {totalQuantitySold.toLocaleString("en-IN")} units
          </div>
          <div className="text-sm text-gray-500 mt-2">This month</div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">
              Most Sold Item
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <FaCartShopping className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div className="text-2xl font-bold">{mostSoldItem.item}</div>
          <div className="text-sm text-gray-500 mt-2">
            {mostSoldItem.quantity} units sold
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">
              Biggest Customer
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <FaUser className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold">{biggestCustomer.customer}</div>
          <div className="text-sm text-gray-500 mt-2">
            Rs. {biggestCustomer.sales.toLocaleString("en-IN")} in sales
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Sales Trend */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Daily Sales Trend
          </h2>
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ fontSize: "12px" }}
          >
            <LineChart data={dailySalesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`Rs. ${value}`, "Sales"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Most Sold Products */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Most Sold Products
          </h2>
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ fontSize: "12px" }}
          >
            <BarChart data={top5SoldProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#82ca9d" name="Quantity Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Customers by Sales */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Biggest Customers
          </h2>
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ fontSize: "12px" }}
          >
            <PieChart>
              <Pie
                data={top5CustomersBySales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
                nameKey="customer"
              >
                {top5CustomersBySales.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`Rs. ${value}`, "Sales"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Status */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Inventory Status
          </h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Inventory Value</p>
              <p className="text-xl font-bold">
                Rs. {totalInventoryValue.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <FaWallet className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="space-y-3">
            {inventoryData.slice(0, 5).map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.itemName}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.quantity} units</p>
                  <p className="text-sm text-gray-500">
                    Rs.{item.sellingPrice} each
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {inventoryData.reduce((total, item) => total + item.quantity, 0)}{" "}
              total units in stock
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
