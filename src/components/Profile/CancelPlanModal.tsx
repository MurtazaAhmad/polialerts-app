"use client";
import React from "react";
import Modal from "react-modal";
import Close from "../Icons/Close";
import Warning from "../Icons/Warning";
import { IoMdArrowDropdown } from "react-icons/io";

export default function CancelPlanModal() {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div>
        <div onClick={openModal} className="cursor-pointer font-Manrope">
          <button className="py-2 px-5 w-fit h-fit bg-blueColor hover:bg-blueHover rounded-full font-semibold border-transparent border-2 text-white">
            Cancel plan
          </button>
        </div>
        <Modal
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[50%] py-16 px-10 bg-white shadow-sm outline-none border rounded-3xl"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Delete Confirmation Modal"
        >
          <div
            onClick={closeModal}
            className="absolute top-3 cursor-pointer right-5"
          >
            <Close />
          </div>

          <div className="font-semibold text-xl">
            <div className="flex gap-3 items-center">
              <Warning />
              <h1 className="text-headingColor font-bold md:text-[1.6rem] text-base">
                Cancel Plan
              </h1>
            </div>
          </div>
          <p className="text-base text-bodyColor my-5">
            Plans can be canceled with a minimum of 2 months&apos; notice.
          </p>

          <div className="flex gap-5 flex-col md:flex-row md:items-center">
            <div className="relative w-full md:w-auto">
              <select className="block appearance-none w-full bg-white border border-blueColor text-bodyColor py-2 md:px-6 md:pr-24 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-blueColor">
                <option value="">Select cancellation date</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <IoMdArrowDropdown className="text-2xl text-blueColor" />
              </div>
            </div>
            <button className="py-1 px-4 w-fit h-fit bg-blueColor rounded-full font-semibold border-transparent border-2 text-white hover:bg-blueHover">
              Cancel Plan
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
