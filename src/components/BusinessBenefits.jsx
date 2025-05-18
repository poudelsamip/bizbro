import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const BusinessBenefits = () => {
  const benefits = [
    {
      title: "Reduce Operational Costs",
      stats: "Up to 40% reduction",
      points: [
        "Minimize inventory holding costs",
        "Reduce manual data entry time",
        "Optimize stock levels automatically"
      ]
    },
    {
      title: "Increase Revenue",
      stats: "25% average growth",
      points: [
        "Better inventory turnover",
        "Improved cash flow management",
        "Reduced stockouts and overselling"
      ]
    },
    {
      title: "Save Time",
      stats: "15+ hours weekly",
      points: [
        "Automated reporting systems",
        "Streamlined order processing",
        "Quick financial reconciliation"
      ]
    }
  ];

  return (
    <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 teko-regular">
          Transform Your Business
        </h2>
        <p className="text-xl text-gray-300 teko-regular">
          See the real impact on your bottom line
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="bg-gray-700 p-8 rounded-lg border border-gray-600"
          >
            <h3 className="text-2xl font-bold mb-2 boldonse-regular">
              {benefit.title}
            </h3>
            <p className="text-3xl text-blue-500 font-bold mb-6">
              {benefit.stats}
            </p>
            <ul className="space-y-3">
              {benefit.points.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessBenefits; 