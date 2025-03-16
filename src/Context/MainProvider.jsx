import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Config/firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Create context to share state globally across components
export const MainContext = createContext();

const MainProvider = ({ children }) => {
  // State to manage the user data
  const [user, setUser] = useState();
  const [currentUserName, setCurrentUserName] = useState("");
  // State to manage all fetched data (inventory, customers, transactions)
  const [allData, setAllData] = useState({
    inventory: [],
    customers: [],
    transactions: [],
  });
  const navigate = useNavigate();

  // Sign up function to create a new user and set up initial data in Firestore
  const signUp = async (email, password, companyName, name) => {
    try {
      // Create a new user with email and password
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user information and initialize empty collections in Firestore
      await setDoc(doc(db, "users", userData.user.email), {
        companyName,
        name,
        email,
      });
      await setDoc(doc(db, "inventory", userData.user.email), {});
      await setDoc(doc(db, "customers", userData.user.email), {});
      await setDoc(doc(db, "transactions", userData.user.email), {});

      setUser(userData.user); // Set the user data in state
      await logIn(email, password); // Log the user in immediately after signing up
    } catch (err) {
      console.log(err); // Log any error
    }
  };

  // Log in function for existing users
  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Sign the user in
      navigate("/dashboard");
    } catch (error) {
      console.log(error); // Log any error
    }
    // Navigate to homepage after successful login
  };

  // Log out function for users to sign out of the app
  const logOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/login");
    } catch (error) {
      console.log(error); // Log any error
    }
  };

  // Function to fetch data from Firestore based on user's email
  const fetchData = async (email) => {
    try {
      const data = {
        inventory: [],
        transactions: [],
        customers: [],
      };

      try {
        // Fetch inventory data
        const inventoryRef = doc(db, "inventory", email);
        const inventorySnapshot = await getDoc(inventoryRef);
        if (inventorySnapshot.exists()) {
          data.inventory = inventorySnapshot.data().allProducts || []; // Default to empty array if no data
        }
      } catch (err) {
        console.log("error inside try catch : \n" + err);
      }

      try {
        // Fetch customers data
        const customersRef = doc(db, "customers", email);
        const customersSnapshot = await getDoc(customersRef);
        if (customersSnapshot.exists()) {
          data.customers = customersSnapshot.data().allCustomers || [];
        }
      } catch (err) {
        console.log("error inside try catch : \n" + err);
      }

      try {
        // Fetch transactions data
        const transactionsRef = doc(db, "transactions", email);
        const transactionsSnapshot = await getDoc(transactionsRef);
        if (transactionsSnapshot.exists()) {
          data.transactions = transactionsSnapshot.data().allTransactions || [];
        }
      } catch (err) {
        console.log("error inside try catch : \n" + err);
      }

      // Set fetched data to state
      setAllData(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const addProductsToInventory = async (item) => {
    try {
      const inventoryRef = doc(db, "inventory", user.email);
      await updateDoc(inventoryRef, {
        allProducts: arrayUnion(item),
      });
    } catch (error) {}
  };

  const addCustomersToCustomers = async (item) => {
    try {
      const inventoryRef = doc(db, "customers", user.email);
      await updateDoc(inventoryRef, {
        allCustomers: arrayUnion(item),
      });
    } catch (error) {}
  };

  const addTransactionToTransactions = async (item, customer) => {
    try {
      const transactionsRef = doc(db, "transactions", user.email);
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

  const receivePayment = async (selectedCustomer, amount) => {
    try {
      const docSnap = await getDoc(doc(db, "customers", user.email), {});
      if (!docSnap.exists()) {
        console.log("error : document not found");
        return;
      }
      const data = docSnap.data();
      const customerDataForUpdate = data.allCustomers || [];

      const updatedCustomers = customerDataForUpdate.map((customer) =>
        customer.businessName === selectedCustomer.businessName
          ? { ...customer, outstandingBalance: amount }
          : customer
      );

      await updateDoc(doc(db, "customers", user.email), {
        allCustomers: updatedCustomers,
      });
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const updateOutStandingBalance = async (customerName, amount) => {
    try {
      const docSnap = await getDoc(doc(db, "customers", user.email), {});
      if (!docSnap.exists()) {
        console.log("error : document not found");
        return;
      }
      const data = docSnap.data();
      const customerDataForUpdate = data.allCustomers || [];
      let beforeAmount = 0;
      const updatedCustomers = customerDataForUpdate.map((customer) => {
        beforeAmount = customer.outstandingBalance;
        return customer.businessName === customerName
          ? { ...customer, outstandingBalance: beforeAmount + amount }
          : customer;
      });

      await updateDoc(doc(db, "customers", user.email), {
        allCustomers: updatedCustomers,
      });
    } catch (error) {
      console.log("error : " + error);
    }
  };

  // Listen to authentication state changes and fetch data accordingly
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); // Set user when authenticated
        await fetchData(user.email); // Fetch user data if authenticated

        const nameSnap = await getDoc(doc(db, "users", user.email), {});
        setCurrentUserName(
          nameSnap.exists() ? nameSnap.data().companyName : ""
        );
      } else {
        setUser(null); // Reset user state if no user is authenticated
      }
    });

    return () => unSub(); // Clean up the subscription when the component unmounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Provide values to child components via context
  const value = {
    signUp,
    logIn,
    logOut,
    inventoryData: allData.inventory,
    customersData: allData.customers,
    transactionsData: allData.transactions,
    setAllData,
    user,
    addProductsToInventory,
    addCustomersToCustomers,
    addTransactionToTransactions,
    updateOutStandingBalance,
    receivePayment,
    fetchData,
    currentUserName,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
