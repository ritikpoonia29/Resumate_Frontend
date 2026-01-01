import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && <div className="container mx-auto pt-0 pb-0 mt-0">{children}</div>}
    </div>
  );
};

export default DashboardLayout;
