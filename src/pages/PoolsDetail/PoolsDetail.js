import React, { useState, useEffect } from "react";
import NavBar from "../../components/layout/navBar";
import { useParams } from "react-router";
import data from "../../idoDetails.json";
import { idoInfo } from "../../poolDetails.js";
import bullAbi from "../../bullpadAbi.json";
import tokenAbi from "../../tokenAbi.json";
import Web3 from "web3";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Countdown from "react-countdown";
import {
  SummaryDetail,
  RocketBackground,
  AddressInput,
  DetailWrapper,
  ImageSection,
  JoinButtonContainer,
  ListSection,
} from "./style/DetailContainer.style";
import MobileProgressBar from "../AllPools/progress-bar/mobile-progressBar";
import { PhoneIdoHeader } from "../AllPools/poolsItem.style";
import Social from "./components/Social";
import rocketDetailImg from "../../img/detail-rocket.svg";
import JoinPoolModal from "./components/JoinPoolModal";
import { ModalBlackBackground } from "./style/JoinPoolModal.style";
const PoolsDetail = ({
  darkMode,
  navigation,
  WalletConnect,
  connect,
  library,
  account,
  active,
}) => {
  const { poolId } = useParams();
  let [isOpen, setIsOpen] = useState(false);
  let [ui, sui]=useState(false);

 
  function closeJoinPoolModal() {
    setIsOpen(false);
  }

  function openJoinPoolModal() {
    setIsOpen(true);
  }

  const Completionist = () => <span className="inline-block">Closed</span>;
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const web3=new Web3(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  )
  //const ido = data[poolId];
  console.log(poolId+"asdasdasdasw");
 // const idos =idoInfo.filter((idodata)=>{if(idodata==poolId){console.log(idodata)}});
  const idos= idoInfo.filter((idoinfo)=>{return idoinfo.id==poolId})[0];
  const BSCAddress = idos.contract;

  //async ()=>{var blocknumber=await library.eth.getBlockNumber();if(blocknumber<idos.startblock){document.getElementsByClassName("counttime")[0].textContent="start in:";}}
  async function status() {
    let blocknumber = await new Web3(
      "https://data-seed-prebsc-1-s1.binance.org:8545"
    ).eth.getBlockNumber();
    if (blocknumber < idos.startblock) {
      document.getElementsByClassName("counttime")[0].textContent = "Start in:";
    } else if (blocknumber > idos.startblock && blocknumber < idos.endblock) {
      document.getElementsByClassName("counttime")[0].textContent = "End in:";
    } else if (blocknumber > idos.endblock) {
      document.getElementsByClassName("counttime")[0].textContent = "Ended";
    }
  }
  async function Time() {
    let blocknumber = await new Web3(
      "https://data-seed-prebsc-1-s1.binance.org:8545"
    ).eth.getBlockNumber();
    if (blocknumber < idos.startblock) {
      return console.log(Date.now() + idos.startblock - blocknumber);
    } else if (blocknumber > idos.startblock && blocknumber < idos.endblock) {
      return console.log(Date.now() + idos.endblock - blocknumber);
    } else if (blocknumber > idos.endblock) {
      return Date.now();
    }
  }

  const [blockNumberss, setBlockNumberss] = useState(0);
     
  async function getBlockNumber() {
    return await new Web3("https://data-seed-prebsc-1-s1.binance.org:8545").eth
      .getBlockNumber()
      .then((value) => {
        setBlockNumberss(value);
      });
  }
  Time();
  status();
  getBlockNumber();
  const Userinfo = ({address,user,useraddr})=>{
     
    if(user==true){
    let instance=  
    new web3.eth.Contract(bullAbi,address).methods;  
    instance.userInfo(useraddr).call().then(
      (response)=>{sui(response)}
    )
      console.log("kheyli gavi")
    }
    
    else{
      console.log("keyli khari");
    }
     return (null);
   }

  return (
    <div className="relative dark:bg-darkMode-600">
      <ModalBlackBackground className={`${isOpen ? "inline" : "hidden"}`} />
      <div className="container mx-auto">
        <NavBar
          WalletConnect={WalletConnect}
          connect={connect}
          library={library}
          darkMode={darkMode}
          navigation={navigation}
        />
           <Userinfo address={idos.idocontract} user={active} useraddr={{ account }.account} />
      </div>
      <section className="bg-gray-100 dark:bg-darkMode-600">
        <div className={"relative container mx-auto px-4 lg:px-14 mt-6"}>
          <DetailWrapper>
            {}
            <ImageSection
              className={
                "border-2 border-gray-200 dark:border-opacity-0 bg-white dark:bg-darkMode-800"
              }
            >
              <div className="p-4 flex flex-col items-center w-full">
                <MobileProgressBar
                  darkMode={darkMode}
                  image={"/image/coins/dragon.jpg"}
                  percentage={"90"}
                  display={"inline-block"}
                />
                <h2 className="font-semibold mt-4 text-2xl text-gray-900 dark:text-white">
                  {idos.name}
                  
                  {async () => {
                    await new Web3(
                      "https://data-seed-prebsc-1-s1.binance.org:8545"
                    ).eth.getBlockNumber();
                  }}
                </h2>
                <PhoneIdoHeader
                  className="self-center text-white mt-1.5 font-bold text-lg"
                  darkMode={darkMode}
                >
                  {90}% <span className="font-medium text-sm">sold</span>
                </PhoneIdoHeader>
                <Social darkMode={darkMode} />
                <JoinButtonContainer className="space-x-4">
                  <button className="bg-green-400 rounded-full px-5 py-2 font-medium focus:outline-none flex items-center space-x-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span onClick={openJoinPoolModal} className="inline-block">
                      Join pool
                    </span>
                  </button>
                  <button className="bg-yellow-400 text-gray-900 rounded-full px-5 py-2 font-medium focus:outline-none">
                    View bscscan
                  </button>
                  <JoinPoolModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    WalletConnect={WalletConnect}
                    connect={connect}
                    library={library}
                    account={account}
                    bullAbi={bullAbi}
                    ido={idos}
                    tokenAbi={tokenAbi}
                  />
                </JoinButtonContainer>
              </div>
              <div className="p-4 flex flex-col items-center w-full border-t border-gray-200 dark:border-gray-700 text-sm">
                <SummaryDetail>
                  <span className="inline-block text-gray-800 dark:text-white">
                    Address
                  </span>
                  <div className="flex items-center space-x-1">
                    <AddressInput
                      className="text-gray-800 dark:text-white"
                      value={(BSCAddress.substr(0,4))+"...."+(BSCAddress.substr(38,42))}
                    />
                    <CopyToClipboard text={BSCAddress}>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-copy w-6"
                          viewBox="0 0 24 24"
                          stroke-width="1"
                          stroke={darkMode === "dark" ? "#ffffff" : "#1B223F"}
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <rect x="8" y="8" width="12" height="12" rx="2" />
                          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                        </svg>
                      </button>
                    </CopyToClipboard>
                  </div>
                </SummaryDetail>
                <SummaryDetail>
                  <span className="inline-block text-gray-800 dark:text-white">
                    Ratio per 1 BUSD
                  </span>
                  <div className="flex items-center text-gray-800 dark:text-white">
                    <span>
                      {idos.offeringallocation / idos.rasingallocation} {idos.name} {blockNumberss}
                    </span>
                  </div>
                </SummaryDetail>
                <SummaryDetail>
                  <span className="inline-block text-gray-800 dark:text-white counttime">Start in:</span>
                  <div className="flex items-center text-gray-800 dark:text-white">
                    <span>
                      <Countdown
                        date={
                          Date.now() +
                          (idos.endblock - blockNumberss) * 3 * 1000
                        }
                      >
                        <Completionist />
                      </Countdown>
                    </span>
                  </div>
                </SummaryDetail>
              </div>
            </ImageSection>

            <ListSection>
              <div className="bg-white border-2 border-gray-200 dark:border-opacity-0 dark:bg-darkMode-800 px-4 py-5 mb-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 pl-3 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#48cae4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="inline-block text-gray-900 dark:text-white">
                    Ido Info
                  </span>
                </h4>
                <ul>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Name</span>
                    <span>{idos.name}</span>
                  </li>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Address</span>
                    <span className="text-sm">{idos.idocontract}</span>
                  </li>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Token for sale</span>
                    <span>{idos.offeringallocation / 1e18}</span>
                  </li>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Token for rasing</span>
                    <span>{idos.rasingallocation / 1e18}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border-2 border-gray-200 dark:border-opacity-0 dark:bg-darkMode-800 px-4 py-5 mb-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 pl-3 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#48cae4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="inline-block text-gray-900 dark:text-white">
                    User Info
                  </span>
                </h4>
                <ul>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Deposited:</span>
                    <span>12000</span>
                  </li>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Token Share:</span>
                    <span className="text-sm">{idos.contract}</span>
                  </li>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Relase Time:</span>
                    <span>100H</span>
                  </li>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Vesting Release Time:</span>
                    <span>300H</span>
                  </li>
                  <li className="grid grid-cols-2 mt-1.5 bg-gray-100 text-gray-900 dark:text-white dark:bg-darkMode-600 px-3 py-3 rounded-md leading-none">
                    <span>Whitelist:</span>
                    <span>True</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border-2 border-gray-200 dark:border-opacity-0 dark:bg-darkMode-800 px-4 py-5 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 pl-3 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-bulb w-6"
                    viewBox="0 0 24 24"
                    stroke-width="1.8"
                    stroke="#ffd100"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                    <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                    <line x1="9.7" y1="17" x2="14.3" y2="17" />
                  </svg>
                  <span className="inline-block text-gray-900 dark:text-white">
                    About Project
                  </span>
                  <button
                    onClick={async () => {
                      await alert(
                        await new library.eth.getStorageAt(
                          "0xfdfd27ae39cebefdbaac8615f18aa68ddd0f15f5",
                          2
                        )
                      );
                    }}
                  >
                    salam
                  </button>
                </h4>
                <p className="mt-1.5 bg-gray-100 text-gray-900 dark:bg-darkMode-600 px-3 py-3 rounded-md leading-normal dark:text-white text-opacity-80">
                  {idos.description}
                </p>
              </div>
            </ListSection>
          </DetailWrapper>
          <button className="text-red-500">
            salam mohammad
          </button>
          <button
            onClick={async () => {
              await alert(
                await new web3.eth.Contract(bullAbi, idos.idocontract).methods
                  .whiteListAllocation()
                  .call()
              );
            }}
          >
            salam2
          </button>
          <button
            onClick={async () => {
              await console.log(
                await new library.eth.Contract(bullAbi, idos.idocontract).methods
                  .participate({ account }.account, "1002020020")
                  .send({ from: { account }.account })
              );
            }}
          >
            salam3
          </button>
          <button
            onClick={async () => {
              await console.log(
                await new library.eth.Contract(bullAbi, idos.idocontract).methods
                  .participate({ account }.account, "1002020020")
                  .send({ from: { account }.account })
              );
            }}
          >
            salam3
          </button> 
          <button
            onClick={async () => {try{
              await console.log(
                await (new library.eth.Contract(bullAbi, idos.idocontract).methods
                  .userInfo({ account }.account)
                  .call().then((response)=>{alert(response.participationAmount)}))
              );
            }finally{}}}
          >
            salam4
          </button>
        </div>
      </section>
    </div>
  );
};

export default PoolsDetail;
