import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaBoxes,
  FaChartBar,
  FaFileInvoiceDollar,
  FaUsers,
  FaClipboardList,
  FaMoneyBillWave,
  FaTools,
  FaChartPie,
} from 'react-icons/fa';
import { MdCategory, MdPayments } from 'react-icons/md';

const Navigation = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaChartBar />,
      path: '/dashboard',
      description: 'Overview of business performance'
    },
    {
      title: 'Inventory',
      icon: <FaBoxes />,
      path: '/inventory',
      description: 'Manage stock and items'
    },
    {
      title: 'Stock Adjustments',
      icon: <MdCategory />,
      path: '/stock-adjustments',
      description: 'Handle damaged or lost inventory'
    },
    {
      title: 'Sales',
      icon: <FaFileInvoiceDollar />,
      path: '/sales',
      description: 'Record and manage sales'
    },
    {
      title: 'Purchases',
      icon: <FaClipboardList />,
      path: '/purchases',
      description: 'Create and track purchase orders'
    },
    {
      title: 'Suppliers',
      icon: <FaUsers />,
      path: '/suppliers',
      description: 'Manage supplier information'
    },
    {
      title: 'Expenses',
      icon: <FaMoneyBillWave />,
      path: '/expenses',
      description: 'Track and categorize expenses'
    },
    {
      title: 'Profit & Loss',
      icon: <FaChartPie />,
      path: '/profit-loss',
      description: 'View financial reports'
    },
    {
      title: 'Transactions',
      icon: <MdPayments />,
      path: '/transactions',
      description: 'View all financial transactions'
    },
    {
      title: 'Settings',
      icon: <FaTools />,
      path: '/settings',
      description: 'Configure system settings'
    }
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">Business Manager</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-16 h-full w-64 bg-gray-800 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-400">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 