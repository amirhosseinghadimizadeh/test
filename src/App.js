import React, { useState, useEffect } from "react";
import "./style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/layout/footer";
import { useDarkModes } from "./components/layout/useDarkMode";
import HomeLayout from "./pageLayout/HomeLayout";
import AllPoolsLayout from "./pageLayout/AllPoolsLayout";
import PoolsDetailLayout from "./pageLayout/PoolsDetailLayout";
import NavBar from "./components/layout/navBar";
import Whitepaper from "./pages/Whitepaper";
//web3 tools
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "././components/layout/connector";

const navigation = [
  { name: "Whitepaper", href: "/whitepaper" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

function App() {
  const { chainId, active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect(WalletConnect) {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function WalletConnect() {
    try {
      await activate(walletconnect);
    } catch (ex) {
      console.log(ex);
    }
  }

  const [useDarkMode, toggleTheme] = useDarkModes();

  return (
    <div className={`${useDarkMode}`}>
      <BrowserRouter>
        <Switch>
          <Route
            path={"/pools/:poolId"}
            component={() => (
              <PoolsDetailLayout
                connect={connect}
                account={account}
                active={active}
                WalletConnect={WalletConnect}
                library={library}
                darkMode={useDarkMode}
              />
            )}
          />
          <Route
            path={"/pools"}
            component={() => (
              <AllPoolsLayout
                WalletConnect={WalletConnect}
                connect={connect}
                account={account}
                active={active}
                library={library}
                darkMode={useDarkMode}
              />
            )}
          />
          <Route path={"/whitepaper"} component={Whitepaper} />
          <Route
            exact
            path={"/"}
            component={() => (
              <HomeLayout
                WalletConnect={WalletConnect}
                connect={connect}
                account={account}
                active={active}
                library={library}
                useDarkMode={useDarkMode}
              />
            )}
          />
        </Switch>
      </BrowserRouter>

      <Footer darkMode={useDarkMode} setDark={toggleTheme} />
    </div>
  );
}

export default App;
