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
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/dispatch" element={<DispatchProduct />}></Route>
            <Route path="/sales" element={<Sales />}></Route>
            <Route path="/transactions" element={<Transactions />}></Route>
          </Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signup" element={<SignupForm />}></Route>
          <Route path="/" element={<Hero />}></Route>
          <Route
            path="*"
            element={
              <div className="w-full h-screen bg-gray-800 pt-10">
                <h1 className="text-center text-5xl text-white font-semibold uppercase">
                  404 : Page not found
                </h1>
                <p className="text-white text-center text-xl mt-5">
                  <a href="/" className="text-blue-600">
                    Click Here
                  </a>{" "}
                  to goto homepage
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
