import React, { useState, useEffect } from "react";
import bullAbi from "./bullpadAbi.json";
import tokenAbi from "./tokenAbi.json";
import Web3 from "web3";
const web3=new Web3(
  "https://data-seed-prebsc-1-s1.binance.org:8545"
)
const idoInfo=   [
{
      id: 1,
      title: "Bulllaunchpad",
      img: "image/coins/ethermoon.jpg",
      progress: 75,
      idocontract: "0x4cdf3baf212ebe3bc8cff40f28c68d7f0f734126",
      date: "5h ago",
      commentCount: 5,
      shareCount: 2,
      access: "public",
      status:"ended"
    },
    {
      id: 3,
      title: "Bulllaunchpad",
      img: "image/coins/realfevr.jpg",
      progress: 19,
      idocontract: "0x4cdf3baf212ebe3bc8cff40f28c68d7f0f734126",
      date: "2h ago",
      commentCount: 3,
      shareCount: 2,
      access: "private",
      status:"future"
    },
    {
      id: 5,
      title: "Bulllaunchpad",
      img: "image/coins/ethermoon.jpg",
      progress: 21,
      idocontract: "0x4cdf3baf212ebe3bc8cff40f28c68d7f0f734126",
      date: "5h ago",
      commentCount: 5,
      shareCount: 2,
      access: "public",
      status:"ended"
    },
    {
      id: 2,
      title: "hmmm so pro",
      name: "hmmm so pro" ,
      img: "image/coins/ethermoon.jpg",
      contract: "0xBca38d9390b9f35ddEc40D9917f98Fee45aB11D3",
      idocontract: "0x4cdf3baf212ebe3bc8cff40f28c68d7f0f734126",
      rasingtoken: "0xBca38d9390b9f35ddEc40D9917f98Fee45aB11D3",
      startblock :"13682953",
      endblock:   "13771000",
      whitelist: "",
      offeringallocation: "1000000000000000000000000",
      rasingallocation: "500000000000000000000000",
      description: "loren lorem lorem lorem lorem is imsum ipsum ipsum ipsum ipsum",
      progress: 56,
      access: "private",
      status:"ongoing"
    },
    {
      id: 0,
      title: "Bulllaunchpad",
      name: "BLPT" ,
      img: "image/coins/ethermoon.jpg",
      contract: "0xBca38d9390b9f35ddEc40D9917f98Fee45aB11D3",
      idocontract: "0x4cdf3baf212ebe3bc8cff40f28c68d7f0f734126",
      rasingtoken: "0xBca38d9390b9f35ddEc40D9917f98Fee45aB11D3",
      startblock :"13682953",
      endblock:   "13771000",
      whitelist: "",
      offeringallocation: "1000000000000000000000000",
      rasingallocation: "500000000000000000000000",
      description: "loren lorem lorem lorem lorem is imsum ipsum ipsum ipsum ipsum",
      progress: 56,
      access: "public",
      status:"ongoing"
    },
  ]
   function poolinfo(type){
    let result=[];
    idoInfo.filter((pool)=>{

      if(pool.status==type){
      result.push(pool);
      }
      
      })
      return result;
  }
const ongoingpool= poolinfo("ongoing");
const endedpool= poolinfo("ended");
const futurepool= poolinfo("future");
export  {ongoingpool,endedpool,futurepool,idoInfo};