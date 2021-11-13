import React from "react";
import ViewAllPools from "../pages/AllPools/viewAllPools";
import Footer from "../components/layout/footer";

const AllPoolsLayout = ({ darkMode, WalletConnect, connect, library, account, active }) => {
  return (
    <>
      <ViewAllPools
        WalletConnect={WalletConnect}
        account={account}
        active={active}
        connect={connect}
        library={library}
        darkMode={darkMode}
        landingContainerWidth={""}
        navJustify={""}
      />
    </>
  );
};

export default AllPoolsLayout;
