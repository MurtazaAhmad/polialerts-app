"use client";
import { useState } from "react";
import Modal from "react-modal";
import Close from "@/components/Icons/Close";
import Warning from "@/components/Icons/Warning";

export default function RemoveCoverageAreaModel() {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() { }
  function closeModal() {
    setIsOpen(false);
  }

  const handleRemoveCoverageArea = () => {
    console.log("Remove Coverage Area");
    closeModal();
  }

  return (
    <>
      <div>
        <div onClick={openModal} className="cursor-pointer font-Manrope">
          <button className="py-1 px-4 w-fit h-fit border-blueColor font-semibold border-2 rounded-full text-blueColor">
            Remove area
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
                Remove coverage area
              </h1>
            </div>
          </div>
          <p className="text-base text-bodyColor my-5 leading-[1.625rem]">
            Warning: removing a coverage area will permanently delete all of your keyword selections. <span className="text-warn text-base">This cannot be undone.</span>
          </p>

          <p className="text-base text-bodyColor my-5 leading-[1.625rem]">Are you sure you want to continue?</p>
          <button onClick={handleRemoveCoverageArea} className="py-2 px-4 w-fit h-fit bg-blueColor rounded-full font-semibold border-transparent border-2 text-white hover:bg-blueHover">
            Remove area permanently
          </button>

        </Modal>
      </div>
    </>
  );
}
