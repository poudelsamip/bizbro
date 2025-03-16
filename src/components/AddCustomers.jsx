import React, { useContext, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5"; // Import back arrow icon
import { MainContext } from "../Context/MainProvider";

const AddCustomers = ({ onClose }) => {
  const { addCustomersToCustomers, fetchData, user } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    id: "",
    businessName: "",
    ownerName: "",
    contactNumber: "",
    email: "",
    address: "",
    registrationDate: "",
    outstandingBalance: 0,
  });
  const [showSummary, setShowSummary] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate the customer form fields
    const isValid =
      customer.businessName &&
      customer.ownerName &&
      customer.contactNumber &&
      customer.email &&
      customer.address &&
      customer.id &&
      customer.registrationDate &&
      customer.outstandingBalance >= 0;

    if (isValid) {
      setShowSummary(true);
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div className="h-full">
      {showSummary && (
        <div className="fixed inset-0 bg-gray-700  flex items-center justify-center z-10">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <IoClose
              className="text-white absolute top-1 right-1 text-3xl cursor-pointer"
              onClick={() => setShowSummary(false)}
            />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Customer Addition Summary
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Customer Added:
              </h3>
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-white">
                  <span className="font-medium">Business Name:</span>{" "}
                  {customer.businessName}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Owner Name:</span>{" "}
                  {customer.ownerName}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Contact Number:</span>{" "}
                  {customer.contactNumber}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Email:</span> {customer.email}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Address:</span>{" "}
                  {customer.address}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">City:</span> {customer.city}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Registration Date:</span>{" "}
                  {customer.registrationDate}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Outstanding Balance:</span>{" "}
                  Rs. {customer.outstandingBalance}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowSummary(false)}
              >
                Edit
              </button>
              <button
                className={`px-4 py-2 ${
                  loading
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-green-700 cursor-pointer"
                }  text-white rounded-lg hover:bg-green-600`}
                onClick={async () => {
                  // Here you would confirm and save to database
                  setLoading(true);
                  await addCustomersToCustomers(customer);
                  await fetchData(user.email);
                  setShowSummary(false);
                  setLoading(false);
                  onClose(); // Return to customer list after successful addition
                }}
              >
                {loading ? "loading..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-semibold text-white drop-shadow-xl">
          ADD CUSTOMER
        </h1>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <IoArrowBack /> Back to Customers
        </button>
      </div>

      <div className="w-full max-w-6xl">
        <form>
          {/* Single Customer Form */}
          <div className="mb-4 bg-gray-700 p-4 rounded-lg">
            <input
              type="text"
              placeholder="id"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="id"
              value={customer.id}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Business Name"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="businessName"
              value={customer.businessName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Owner Name"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="ownerName"
              value={customer.ownerName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="contactNumber"
              value={customer.contactNumber}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="email"
              value={customer.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="address"
              value={customer.address}
              onChange={handleChange}
            />

            <input
              type="date"
              placeholder="Registration Date"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="registrationDate"
              value={customer.registrationDate}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Outstanding Balance"
              className="w-full p-2 mb-2 text-gray-300 bg-gray-800 rounded-md"
              name="outstandingBalance"
              value={customer.outstandingBalance}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-sm px-3 py-1 bg-green-600 active:bg-green-700 cursor-pointer border border-gray-500 rounded text-white"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomers;
