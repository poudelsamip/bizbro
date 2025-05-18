import React from "react";
import { 
  FaChartLine, 
  FaBoxes, 
  FaFileInvoiceDollar, 
  FaUsers, 
  FaChartPie,
  FaCloudDownloadAlt,
  FaReceipt,
  FaTruck,
  FaCalculator
} from "react-icons/fa";

const KeyFeatures = () => {
  const features = [
    {
      icon: <FaBoxes className="text-4xl text-blue-500" />,
      title: "Smart Inventory Management",
      description: "Track stock levels, manage multiple warehouses, and set automatic reorder points"
    },
    {
      icon: <FaFileInvoiceDollar className="text-4xl text-blue-500" />,
      title: "Professional Invoicing",
      description: "Create and customize invoices, track payments, and send automatic payment reminders"
    },
    {
      icon: <FaCalculator className="text-4xl text-blue-500" />,
      title: "Accounting & Bookkeeping",
      description: "Manage accounts payable/receivable, track expenses, and handle tax calculations"
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-500" />,
      title: "Real-time Analytics",
      description: "Get instant insights into sales, inventory, and financial performance with dynamic dashboards"
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: "Customer & Supplier Management",
      description: "Maintain detailed profiles, track transaction history, and manage relationships"
    },
    {
      icon: <FaReceipt className="text-4xl text-blue-500" />,
      title: "Purchase Order Management",
      description: "Create and track purchase orders, manage approvals, and monitor vendor performance"
    },
    {
      icon: <FaTruck className="text-4xl text-blue-500" />,
      title: "Supply Chain Tracking",
      description: "Monitor goods movement, track shipments, and manage delivery schedules"
    },
    {
      icon: <FaChartPie className="text-4xl text-blue-500" />,
      title: "Financial Reporting",
      description: "Generate profit & loss statements, balance sheets, and customizable financial reports"
    },
    {
      icon: <FaCloudDownloadAlt className="text-4xl text-blue-500" />,
      title: "Cloud-Based System",
      description: "Access your data securely from anywhere, with automatic backups and updates"
    }
  ];

  return (
    <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 teko-regular">
          Powerful Features for Your Business
        </h2>
        <p className="text-xl text-gray-300 teko-regular">
          Everything you need to manage your business efficiently in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 boldonse-regular">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures; 