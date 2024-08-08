"use client";
import React from "react";
import Modal from "react-modal";
import Close from "../Icons/Close";
import { IoMdArrowDropdown } from "react-icons/io";
import Institution from "../Icons/Institution";

export default function CoverageAreaModel({mainCategories}) {

  console.log(mainCategories);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  var subtitle;
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
        <div onClick={openModal} className="curor-pointer font-Manrope">
          New coverage area
        </div>
        <Modal
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%]  md:w-[50%] py-16 px-10 bg-white shadow-sm outline-none border rounded-3xl"
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Delete Confirmation Modal"
        >
          <div
            onClick={closeModal}
            className="absolute top-3  cursor-pointer right-5"
          >
            <Close />
          </div>

          <div className="font-semibold text-xl">
            <div className="flex gap-3 items-center">
              <Institution />
              <h1 className="text-headingColor font-bold md:text-[1.6rem] text-base">
                New coverage area
              </h1>
            </div>
          </div>

          <div className="flex gap-5 flex-col lg:flex-row lg:items-center mt-5">
            <div className="select-wrapper relative w-full lg:w-auto">
              <select className="block appearance-none w-full bg-white border border-blueColor text-bodyColor py-2 md:px-6 md:pr-16 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-blueColor">
                <option value="">Select level of government</option>
                <option value="">Federal</option>
                <option value="">Provincial</option>
                <option value="">Municipal</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <IoMdArrowDropdown className="text-2xl text-blueColor" />
              </div>
            </div>

            <div className="select-wrapper relative  w-full lg:w-auto">
              <select className="block appearance-none w-full bg-white border border-blueColor text-bodyColor py-2 md:px-6 md:pr-24 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-blueColor">
                <option value="">Select jurisdiction</option>
                <option value="federal">1</option>
                <option value="provincial">2</option>
                <option value="municipal">3</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <IoMdArrowDropdown className="text-2xl text-blueColor" />
              </div>
            </div>
          </div>
          <button className="mt-5 py-1 px-4 w-fit h-fit bg-blueColor rounded-full font-semibold border-transparent border-2 text-white hover:bg-blueHover">
            Add area
          </button>
        </Modal>
      </div>
    </>
  );
}
