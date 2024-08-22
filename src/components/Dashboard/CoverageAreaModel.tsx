"use client";
import React from "react";
import Modal from "react-modal";
import Close from "@/components/Icons/Close";
import { IoMdArrowDropdown } from "react-icons/io";
import Institution from "@/components/Icons/Institution";
import { Category, User } from "@/types";
import { IoCloseSharp } from "react-icons/io5";

interface CoverageAreaModelProps {
  addChannel: (main_category: string, sub_category: string) => void;
  fetchSubCategories: (parent: string) => void;
  mainCategories: Category[];
  userDetails: User;
  fetchUser: (userId: string) => void;
  subCategories: Category[];
}

export default function CoverageAreaModel({
  addChannel,
  fetchSubCategories,
  fetchUser,
  mainCategories,
  userDetails,
  subCategories,
}: CoverageAreaModelProps) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const [mainCategory, setMainCategory] = React.useState<string>("");
  const [subCategory, setSubCategory] = React.useState<string>("");

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

  const handleMainCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    fetchSubCategories(e.target.value); //Fetching Sub-Categories

    let mainCat = mainCategories.find(
      (category) => category.id === e.target.value
    );
    if (mainCat) {
      setMainCategory(mainCat.name);
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let subCat = subCategories.find(
      (category) => category.id === e.target.value
    );
    if (subCat) {
      setSubCategory(subCat.name);
    }
  };

  // Add
  const handleAddArea = async () => {
    try {
      await addChannel(mainCategory, subCategory);
      console.log("Channel Added Successfully!");
      closeModal();

      // Resetting the values
      setMainCategory("");
      setSubCategory("");

      if (!userDetails.id) throw new Error("User not found.");
      // Updating the user details
      fetchUser(userDetails.id);

    } catch (error) {
      console.log("Error in adding area", error);
    }
  };

  return (
    <>
      <div className="font-Manrope">
        <div
          onClick={openModal}
          className="cursor-pointer mt-5 px-7 py-1 w-fit h-fit bg-blueColor hover:bg-blueHover rounded-full  border-transparent border-2 text-white flex items-center text-base font-semibold"
        >
          <span className="font-semibold mr-3 text-3xl">+</span>
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
            <button className=" text-iota text-4xl font-bold">
              <IoCloseSharp />
            </button>
          </div>

          <div className="font-semibold text-xl">
            <div className="flex gap-3 items-center">
              <Institution />
              <h3 className="text-headingColor font-bold text-[1.375rem] leading-[1.875rem] md:text-[1.625rem] md:leading-[2.375rem]">
                New coverage area
              </h3>
            </div>
          </div>

          {userDetails?.subscription_type == "PRO" && (
            <>
              <div className="flex gap-5 flex-col lg:flex-row lg:items-center mt-5">
                <div className="select-wrapper relative w-full lg:w-auto">
                  <select
                    onChange={handleMainCategoryChange}
                    className="block appearance-none w-full bg-white border border-blueColor text-bodyColor py-2 md:px-6 md:pr-16 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-blueColor"
                  >
                    <option value="">Select level of government</option>
                    {mainCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <IoMdArrowDropdown className="text-2xl text-blueColor" />
                  </div>
                </div>
                {subCategories.length > 0 && (
                  <div className="select-wrapper relative  w-full lg:w-auto">
                    <select
                      onChange={handleSubCategoryChange}
                      className="block appearance-none w-full bg-white border border-blueColor text-bodyColor py-2 md:px-6 md:pr-24 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-blueColor"
                    >
                      <option value="">Select jurisdiction</option>
                      {subCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <IoMdArrowDropdown className="text-2xl text-blueColor" />
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleAddArea}
                className="mt-5 py-1 px-4 w-fit h-fit bg-blueColor rounded-full font-semibold border-transparent border-2 text-white hover:bg-blueHover"
              >
                Add area
              </button>
            </>
          )}

          {userDetails?.subscription_type == "BUDGET" && (
            <>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">
                Your plan includes 1 coverage area which is already in use. If
                you would like to set up a new coverage area, please remove the
                other one or{" "}
                <a className="text-blueColor font-semibold underline hover:no-underline">
                  upgrade your plan{" "}
                </a>{" "}
                to increase the number of coverage areas you can track.
              </p>
              <button className="mt-5 py-1 px-4 w-fit h-fit bg-blueColor rounded-full font-semibold border-transparent border-2 text-white hover:bg-blueHover">
                Go back
              </button>
            </>
          )}

          {userDetails?.subscription_type == "PLUS" && (
            <>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">
                Your plan includes 2 coverage areas which are already in use. If
                you would like to set up a new coverage area, please remove
                existing one(s) or{" "}
                <a className="text-blueColor font-semibold underline hover:no-underline">
                  upgrade your plan{" "}
                </a>{" "}
                to increase the number of coverage areas you can track.
              </p>
              <button className="mt-5 py-1 px-4 w-fit h-fit bg-blueColor rounded-full font-semibold border-transparent border-2 text-white hover:bg-blueHover">
                Go back
              </button>
            </>
          )}
        </Modal>
      </div>
    </>
  );
}
