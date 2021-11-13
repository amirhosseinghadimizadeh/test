import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Fragment, useState } from "react";
import {
  JoinModal,
  JoinNowButton,
  PoolInputValue,
} from "../style/JoinPoolModal.style";
import JoinPoolRadioGroup from "./JoinPoolRadioGroup";
const commingSoon = () => {
  toast.info("Comming soon");
};
const JoinPoolModal = ({ isOpen, setIsOpen , WalletConnect , connect , library , account , bullAbi , ido , tokenAbi }) => {
  function closeJoinPoolModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeJoinPoolModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <JoinModal className="bg-darkMode-800 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold leading-6"
                >
                  Buy your token right now
                </Dialog.Title>
                <div className="mt-4">
                </div>

               

                <PoolInputValue className="amount"  placeholder="Purchase amount" />
                <JoinNowButton
                  className="text-lg font-semibold mt-2 rounded"
                  type="button"
                  onClick={async () => {

                  if({account}.account==null){
                    console.log("connect wallet");
                  }
                  else{
                  let value =await library.utils.toWei(document.getElementsByClassName("amount")[0].value);
                  let totalAllowance=await new library.eth.Contract(tokenAbi,ido.rasingtoken).methods.allowance({account}.account,ido.idocontract).call();
                  console.log(value+"____"+totalAllowance);
                    if(parseInt(totalAllowance)<parseInt(value)){
                      await new library.eth.Contract(tokenAbi,ido.rasingtoken).methods.approve(ido.idocontract,value).send({from:{account}.account});
                    }
                    else{
                      await new library.eth.Contract(bullAbi,ido.idocontract).methods.participate({account}.account,value).send({from:{account}.account});
                    }
                  }

                  }}
                >
                  Join Now

                </JoinNowButton>
                <button onClick={async ()=>{await console.log( await library.eth.getBlockNumber())}}>salam</button>
              </JoinModal>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default JoinPoolModal;
