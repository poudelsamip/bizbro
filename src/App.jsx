import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Inventory from "./Pages/Inventory";
import Customers from "./Pages/Customers";
import DispatchProduct from "./Pages/DispatchProduct";
import LoginForm from "./Pages/LoginForm";
import SignupForm from "./Pages/SignupForm";
import Transactions from "./Pages/Transactions";
import Sales from "./Pages/Sales";
import Hero from "./Pages/Hero";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { IoMdArrowRoundBack } from "react-icons/io";

function App() {
  const sideBar = [
    "/dashboard",
    "/inventory",
    "/customers",
    "/dispatch",
    "/sales",
    "/transactions",
  ];
  const location = useLocation();

  return (
    <div className="flex">
      {sideBar.includes(location.pathname) && <Sidebar />}
      <div
        className={`${
          sideBar.includes(location.pathname) &&
          location.pathname !== "/dashboard"
            ? "p-5"
            : ""
        } w-full bg-gray-600 h-screen overflow-auto`}
      >
        <Routes>
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/inventory" element={<Inventory />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/dispatch" element={<DispatchProduct />}></Route>
          <Route path="/sales" element={<Sales />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
          {/* </Route> */}
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signup" element={<SignupForm />}></Route>
          <Route path="/" element={<Hero />}></Route>
          <Route
            path="*"
            element={
              <section class="bg-gray-900 text-white py-8 px-4 mx-auto h-screen w-screen lg:py-16 lg:px-6">
                <div class="mx-auto text-center">
                  <h1 class="text-7xl font-bold lg:text-9xl ranchers-regular">
                    404
                  </h1>
                  <p class="mb-4 text-2xl font-bold ranchers-regular">
                    Page Not Found
                  </p>

                  <a
                    href="/"
                    class="inline-flex items-center gap-2 border broder-gray-400 text-white bg-blue-700 hover:bg-blue-900 font-medium rounded text-sm px-3 py-2 my-4"
                  >
                    <IoMdArrowRoundBack size={20} />
                    Homepage
                  </a>
                </div>
              </section>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
