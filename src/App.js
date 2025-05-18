import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navigation from "./components/Navigation";
import Dashboard from "./Pages/Dashboard";
import Inventory from "./Pages/Inventory";
import Sales from "./Pages/Sales";
import Customers from "./Pages/Customers";
import Transactions from "./Pages/Transactions";
import StockAdjustment from "./components/StockAdjustment";
import ProfitLossReport from "./components/ProfitLossReport";
import Suppliers from "./Pages/Suppliers";
import Expenses from "./Pages/Expenses";
import Purchases from "./Pages/Purchases";
import Settings from "./Pages/Settings";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex min-h-screen bg-gray-900">
          <Navigation />
          <div className="flex-1 ml-64 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/stock-adjustments" element={<StockAdjustment />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/profit-loss" element={<ProfitLossReport />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 