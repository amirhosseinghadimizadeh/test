import React from "react";
import LandingSection from "../pages/Home/landingSection";
import MobileRoadmap from "../pages/Home/mobileRoadmap";
import Roadmap from "../pages/Home/roadmap";
import IdoCard from "../components/layout/idoCard";
import WhitepaperPreview from "../pages/Home/whitepaperPreview";
import Partners from "../pages/Home/partners";

const HomeLayout = ({ useDarkMode, WalletConnect, connect, library, account, active, toggleTheme }) => {
  return (
    <>
      <LandingSection
        WalletConnect={WalletConnect}
        account={account}
        active={active}
        connect={connect}
        library={library}
        darkMode={useDarkMode}
        landingContainerWidth={"lg:max-w-2xl lg:w-full"}
      />

      <main>
        <MobileRoadmap />
        <Roadmap />
        <IdoCard account={account} active={active} useDarkMode={useDarkMode} />
        <Partners />
      </main>
    </>
  );
};

export default HomeLayout;
