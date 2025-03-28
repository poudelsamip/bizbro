import React, { useContext, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addCustomerToCustomers } from "../store/customersSlice";
import { addSupplierToSuppliers } from "../store/suppliersSlice";

const AddSupplier = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState({
    id: "",
    suppliersName: "",
    contactNumber: "",
    email: "",
    credit: 0,
  });
  const [showSummary, setShowSummary] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isValid =
      supplier.suppliersName &&
      supplier.contactNumber &&
      supplier.email &&
      supplier.id;

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
          <div className="bg-gray-800 p-6  max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <IoClose
              className="text-white absolute top-1 right-1 text-3xl cursor-pointer"
              onClick={() => setShowSummary(false)}
            />
            <h2 className="text-2xl font-semibold text-white mb-4">
              New Supplier Addition Summary
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white mb-2">
                Supplier Added:
              </h3>
              <div className="bg-gray-700 p-3">
                <p className="text-white">
                  <span className="font-medium">Suppliers Name:</span>{" "}
                  {supplier.suppliersName}
                </p>

                <p className="text-gray-300">
                  <span className="text-gray-400">Contact Number:</span>{" "}
                  {supplier.contactNumber}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Email:</span> {supplier.email}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => setShowSummary(false)}
              >
                Edit
              </button>
              <button
                className={`px-4 py-2 ${
                  loading
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-green-700 cursor-pointer"
                }  text-white  hover:bg-green-600`}
                onClick={async () => {
                  setLoading(true);
                  // await addCustomersToCustomers(supplier);
                  await dispatch(addSupplierToSuppliers(supplier)).unwrap();
                  // await fetchData(user.email); // fetched on add supplier function
                  setShowSummary(false);
                  setLoading(false);
                  onClose();
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
          ADD SUPPLIER
        </h1>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white  hover:bg-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <IoArrowBack /> Back to Customers
        </button>
      </div>

      <div className="w-full max-w-6xl">
        <form>
          <div>
            <div>
              <label className="text-xs text-gray-300">supplier ID</label>
              <input
                type="text"
                placeholder="id"
                className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
                name="id"
                value={supplier.id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs text-gray-300">Supplier</label>
              <input
                type="text"
                placeholder="Suppliers Name"
                className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
                name="suppliersName"
                value={supplier.suppliersName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-xs text-gray-300">Contact</label>
              <input
                type="text"
                placeholder="Contact Number"
                className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
                name="contactNumber"
                value={supplier.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="block max-w-[300px] bg-gray-800 border border-gray-500 text-white text-sm  w-full py-2 px-3"
                name="email"
                value={supplier.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-sm px-3 py-1 bg-green-600 active:bg-green-700 cursor-pointer border border-gray-500  text-white"
            >
              Add Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;
