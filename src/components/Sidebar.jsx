import React, { useContext } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { IoIosListBox } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
import { IoBusiness } from "react-icons/io5";

const Sidebar = () => {
  // const { logOut } = useContext(MainContext);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    // await logOut();
    await dispatch(logOut()).unwrap();
  };
  return (
    <>
      <aside className="h-screen w-[250px] flex flex-col ">
        <div className="overflow-y-auto bg-gray-800 flex-1">
          <h1 className="cursor-pointer text-4xl p-3 font-semibold text-white">
            👊BizBro
          </h1>
          <ul className=" font-medium text-md">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center m-3 px-2 p-1 text-white hover:bg-gray-700 group"
              >
                <MdSpaceDashboard />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            <hr className="w-[90%] mx-auto text-gray-500 " />
            <li>
              <NavLink
                to="/inventory"
                className="flex items-center m-3 px-2 py-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SiHomeassistantcommunitystore />
                <span className="flex-1 ms-3 whitespace-nowrap">Inventory</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customers"
                className="flex items-center m-3 px-2 py-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUsers />
                <span className="flex-1 ms-3 whitespace-nowrap">Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/suppliers"
                className="flex items-center m-3 px-2 py-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoBusiness />
                <span className="flex-1 ms-3 whitespace-nowrap">Suppliers</span>
              </NavLink>
            </li>
            <hr className="w-[95%] mx-auto text-gray-500 " />
            <li>
              <NavLink
                to="/dispatch"
                className="flex items-center m-3 px-2 py-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaTruck />
                <span className="flex-1 ms-3 whitespace-nowrap">Dispatch</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/purchases"
                className="flex items-center m-3 px-2 py-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BiSolidPurchaseTag />
                <span className="flex-1 ms-3 whitespace-nowrap">Purchases</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sales"
                className="flex items-center m-3 px-2 py-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoIosListBox />
                <span className="flex-1 ms-3 whitespace-nowrap">Sales</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className="flex items-center m-3 px-2 py-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GiMoneyStack />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Transactions
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900 p-3">
          <button
            onClick={handleLogOut}
            className="text-white w-full px-3 py-1 bg-blue-600 active:bg-blue-500 cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
