import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ProfitLossReport = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportData, setReportData] = useState(null);
  
  const salesData = useSelector((state) => state.sales.salesData);
  const expensesData = useSelector((state) => state.expenses.expensesData);
  const purchasesData = useSelector((state) => state.purchases.purchaseData);

  const calculateDateRange = () => {
    const now = new Date();
    let startDate;
    
    switch(timeRange) {
      case 'quarter':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    return { startDate, endDate: now };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    const { startDate, endDate } = calculateDateRange();
    
    // Filter data based on date range
    const filteredSales = salesData.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= startDate && saleDate <= endDate;
    });

    const filteredExpenses = expensesData.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= startDate && expenseDate <= endDate;
    });

    const filteredPurchases = purchasesData.filter(purchase => {
      const purchaseDate = new Date(purchase.date);
      return purchaseDate >= startDate && purchaseDate <= endDate;
    });

    // Calculate totals
    const totalSales = filteredSales.reduce((sum, sale) => sum + sale.grandTotal, 0);
    const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalPurchases = filteredPurchases.reduce((sum, purchase) => sum + purchase.grandTotal, 0);
    const grossProfit = totalSales - totalPurchases;
    const netProfit = grossProfit - totalExpenses;

    // Calculate monthly/periodic data for chart
    const monthlyData = [];
    let current = new Date(startDate);
    
    while (current <= endDate) {
      const periodSales = filteredSales
        .filter(sale => new Date(sale.date).getMonth() === current.getMonth())
        .reduce((sum, sale) => sum + sale.grandTotal, 0);
      
      const periodExpenses = filteredExpenses
        .filter(expense => new Date(expense.createdAt).getMonth() === current.getMonth())
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      const periodPurchases = filteredPurchases
        .filter(purchase => new Date(purchase.date).getMonth() === current.getMonth())
        .reduce((sum, purchase) => sum + purchase.grandTotal, 0);

      monthlyData.push({
        period: current.toLocaleString('default', { month: 'short' }),
        sales: periodSales,
        expenses: periodExpenses,
        purchases: periodPurchases,
        profit: periodSales - periodExpenses - periodPurchases
      });

      current.setMonth(current.getMonth() + 1);
    }

    setReportData({
      summary: {
        totalSales,
        totalExpenses,
        totalPurchases,
        grossProfit,
        netProfit
      },
      monthlyData
    });
  }, [timeRange, salesData, expensesData, purchasesData]);

  if (!reportData) return <div>Loading...</div>;

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Profit & Loss Report</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded cursor-pointer ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-4 py-2 rounded cursor-pointer ${
              timeRange === 'quarter'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Quarter
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded cursor-pointer ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Sales</h3>
          <p className="text-white text-xl font-bold mt-1">
            {formatCurrency(reportData.summary.totalSales)}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Purchases</h3>
          <p className="text-white text-xl font-bold mt-1">
            {formatCurrency(reportData.summary.totalPurchases)}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Expenses</h3>
          <p className="text-white text-xl font-bold mt-1">
            {formatCurrency(reportData.summary.totalExpenses)}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Gross Profit</h3>
          <p className={`text-xl font-bold mt-1 ${
            reportData.summary.grossProfit >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {formatCurrency(reportData.summary.grossProfit)}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Net Profit</h3>
          <p className={`text-xl font-bold mt-1 ${
            reportData.summary.netProfit >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {formatCurrency(reportData.summary.netProfit)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">Periodic Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={reportData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="period" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff',
              }}
            />
            <Legend />
            <Bar dataKey="sales" name="Sales" fill="#3B82F6" />
            <Bar dataKey="purchases" name="Purchases" fill="#EF4444" />
            <Bar dataKey="expenses" name="Expenses" fill="#F59E0B" />
            <Bar dataKey="profit" name="Profit" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitLossReport; 