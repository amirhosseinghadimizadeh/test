import React from "react";
import NavBar from "../components/layout/navBar";
import PoolsDetail from "../pages/PoolsDetail/PoolsDetail";

const navigation = [
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const PoolsDetailLayout = ({ darkMode, WalletConnect, connect, library, account, active }) => {
  return (
    <>
      <PoolsDetail
        WalletConnect={WalletConnect}
        account={account}
        active={active}
        connect={connect}
        library={library}
        darkMode={darkMode}
        navigation={navigation}
      />
    </>
  );
};

export default PoolsDetailLayout;
