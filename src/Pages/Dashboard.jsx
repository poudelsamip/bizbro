import { useContext } from "react";
import { MainContext } from "../Context/MainProvider";

const Dashboard = () => {
  const { currentUserName } = useContext(MainContext);
  return (
    <>
      <h1 className="text-4xl text-white font-semibold">
        Hello, {currentUserName} 👋
      </h1>
    </>
  );
};

export default Dashboard;
