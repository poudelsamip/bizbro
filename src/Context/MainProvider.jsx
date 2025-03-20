import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Config/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

export const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [currentUserName, setCurrentUserName] = useState("");
  const location = useLocation();
  const unAuthRoute = ["/", "/login", "/signup"];
  const [error, setError] = useState(null);

  const [allData, setAllData] = useState({
    inventory: [],
    customers: [],
    transactions: [],
    sales: [],
  });
  const navigate = useNavigate();

  const signUp = async (email, password, companyName, name) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userData.user.email), {
        companyName,
        name,
        email,
      });

      const collections = ["inventory", "customers", "sales", "transactions"];
      await Promise.all(
        collections.map((item) => setDoc(doc(db, item, user.email), {}))
      );

      setUser(userData.user);
      await logIn(email, password);
    } catch (error) {
      setError(error.code);
    }
  };

  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(false);
      navigate("/dashboard");
    } catch (error) {
      setError(error.code);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (email) => {
    const data = {
      inventory: [],
      transactions: [],
      customers: [],
      sales: [],
    };

    try {
      const collections = ["inventory", "customers", "sales", "transactions"];

      const [
        inventorySnapshot,
        customersSnapshot,
        salesSnapshot,
        transactionsSnapshot,
      ] = await Promise.all(
        collections.map((item) => getDoc(doc(db, item, email)))
      );
      data.inventory = inventorySnapshot.exists()
        ? inventorySnapshot.data().allProducts || []
        : [];
      data.customers = customersSnapshot.exists()
        ? customersSnapshot.data().allCustomers || []
        : [];
      data.transactions = transactionsSnapshot.exists()
        ? transactionsSnapshot.data().allTransactionData || []
        : [];
      data.sales = salesSnapshot.exists()
        ? salesSnapshot.data().allTransactions || []
        : [];

      setAllData(data);
    } catch (error) {
      console.log(error.code);
    }
  };

  const adderFunctionForFirebase = async (collection, fieldName, item) => {
    try {
      updateDoc(doc(db, collection, user.email), {
        [fieldName]: arrayUnion(item),
      });
    } catch {
      console.log(error);
    }
  };

  const addProductsToInventory = (item) =>
    adderFunctionForFirebase("inventory", "allProducts", item);
  const addCustomersToCustomers = (item) =>
    adderFunctionForFirebase("customers", "allCustomers", item);
  const addTransactionsToTransactions = (item) =>
    adderFunctionForFirebase("transactions", "allTransactionData", item);

  // addSalesToSales
  const addSalesToSales = async (item, customer) => {
    try {
      const transactionsRef = doc(db, "sales", user.email);
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long", // "Monday"
        year: "numeric", // "2025"
        month: "long", // "March"
        day: "numeric", // "14"
      });

      const grandTotal = item.reduce((acc, item) => acc + item.totalPrice, 0);

      const productsObject = Object.fromEntries(
        item.map((item, index) => [index, item])
      );
      const temp = {
        date: formattedDate,
        customer: customer,
        grandTotal: grandTotal,
        products: productsObject,
      };
      await updateDoc(transactionsRef, {
        allTransactions: arrayUnion(temp),
      });
    } catch (error) {
      alert(error);
    }
  };

  //for receiving from customers table
  const receivePayment = async (selectedCustomer, amount) => {
    const updatedCustomers = allData.customers.map((customer) =>
      customer.businessName === selectedCustomer.businessName
        ? {
            ...customer,
            outstandingBalance: amount,
          }
        : customer
    );

    await updateDoc(doc(db, "customers", user.email), {
      allCustomers: updatedCustomers,
    });
  };

  // for product on credit
  const updateOutStandingBalance = async (customerName, amount) => {
    const updatedCustomers = allData.customers.map((customer) => {
      return customer.businessName === customerName
        ? {
            ...customer,
            outstandingBalance: customer.outstandingBalance + amount,
          }
        : customer;
    });

    await updateDoc(doc(db, "customers", user.email), {
      allCustomers: updatedCustomers,
    });
  };

  const addStock = async (productName, stock) => {
    const updatedAllProducts = allData.inventory.map((product) => {
      return product.itemName === productName
        ? { ...product, quantity: stock }
        : product;
    });

    await updateDoc(doc(db, "inventory", user.email), {
      allProducts: updatedAllProducts,
    });
  };

  const updateStock = async (dispatchedItems) => {
    // const updatedProducts = allData.inventory.filter((product) =>
    //   dispatchedItems.some((item) => item.itemName === product.itemName)
    // ).map(item => );
    const updatedProducts = allData.inventory.map((item) => {
      const currentItem = dispatchedItems.find(
        (itm) => item.itemName === itm.itemName
      );
      if (currentItem) {
        return { ...item, quantity: item.quantity - currentItem.quantity };
      } else {
        return item;
      }
    });

    await updateDoc(doc(db, "inventory", user.email), {
      allProducts: updatedProducts,
    });
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        if (!user || user.email !== authUser.email) {
          setUser(authUser);
          await fetchData(authUser.email);
          const nameSnap = await getDoc(doc(db, "users", authUser.email));

          setCurrentUserName(() =>
            nameSnap.exists() ? nameSnap.data().companyName : ""
          );
        }
      } else {
        if (!unAuthRoute.includes(location.pathname)) {
          navigate("/login");
        }
        setUser(null);
      }
    });

    return () => unSub();
  }, [user]);

  const value = {
    signUp,
    logIn,
    logOut,
    inventoryData: allData.inventory,
    customersData: allData.customers,
    transactionsData: [...allData.transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    ),
    // transactionsData: allData.transactions,
    salesData: [...allData.sales].sort(
      // sorting by date before sending data
      (a, b) => new Date(b.date) - new Date(a.date)
    ),
    setAllData,
    user,
    addProductsToInventory,
    addCustomersToCustomers,
    addSalesToSales,
    addTransactionsToTransactions,
    updateOutStandingBalance,
    addStock,
    updateStock,
    receivePayment,
    fetchData,
    currentUserName,
    error,
    setError,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
