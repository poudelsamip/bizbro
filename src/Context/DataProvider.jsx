import React, { use, useContext, useEffect, useState } from "react";
import { MainContext } from "./MainProvider";

export const DataContext = useContext();

const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState({
    inventory: [],
    customers: [],
    transactions: [],
  });

  const { user } = useContext(MainContext);
  useEffect(() => {
    const getAllData = async () => {};

    if (user) {
      getAllData();
    }
  }, []);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
