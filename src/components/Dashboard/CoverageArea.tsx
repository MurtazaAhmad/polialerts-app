"use client";
import React, { useState } from "react";
import Speed from "../Icons/Speed";
import Calendar from "../Icons/Calendar";
import Quote from "../Icons/Quote";
import Email from "../Icons/Email";
import { IoCloseSharp } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

export default function CoverageArea() {
  const [showRightSide, setShowRightSide] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const toggleRightSide = () => {
    setShowRightSide(!showRightSide);
  };

  const [value, setValue] = useState(20);
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const emails = [
    "john.doe@example.com",
    "jane.smith@example.com",
    "alice@example.com",
    "bob.brown@example.com",
  ];
  return (
    <>
      <section className="lg:mx-28  md:mx-14 mx-5 py-5 md:py-10  md:gap-5 gap-5  md:flex-row flex-col flex md:justify-between md:items-start">
        <div className="flex w-full md:flex-row flex-col gap-5 ">
          {/* left side */}
          <div className="md:w-[30%] w-full flex justify-between md:items-start items-center">
            <div className="flex flex-col gap-3">
              <p className="uppercase text-base text-bodyColor">Federal</p>
              <h2 className="font-bold text-headingColor md:text-[1.6rem] text-base">
                Canadian State
              </h2>
              <button className="py-1 px-4 w-fit h-fit border-blueColor font-semibold border-2 rounded-full text-blueColor">
                Remove area
              </button>
            </div>

            {isMobile && (
              <button
                onClick={toggleRightSide}
                className="text-blueColor text-5xl"
              >
                {showRightSide ? "-" : "+"}
              </button>
            )}
          </div>

          {/* right-side */}

          <div className="md:w-[70%] w-full ">
            {/* first */}
            {(showRightSide || !isMobile) && (
              <div>
                <div className="flex md:flex-row flex-col md:gap-10 gap-5 mb-5">
                  <div className="md:w-[50%] w-full">
                    <div className="flex items-center gap-2 my-5">
                      <Speed />
                      <h2 className="font-bold text-headingColor md:text-[1.6rem] text-base">
                        Real-time email alerts
                      </h2>
                    </div>
                    <div className="flex gap-5 md:gap-2 my-5">
                      <input
                        required
                        name="first-name"
                        type="text"
                        className="rounded-full border h-fit border-blueColor outline-none w-full  py-1 px-3"
                        placeholder="Add keywords here"
                      />
                      <button
                        type="submit"
                        className="py-1 px-5 w-fit  h-fit  bg-blueColor  rounded-full font-semibold border-transparent border-2 text-white"
                      >
                        Add
                      </button>
                    </div>
                    <div className="bg-lightGray pr-6 rounded-xl h-fit py-5 pl-5 md:pr-7 ">
                      <div className="bg-lightGray w-full rounded-xl  customScrollbar  overflow-auto h-[30vh] md:h-[50vh]">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
                          return (
                            <div
                              key={index}
                              className="bg-white flex items-center my-5 text-bodyColor py-1 px-2 w-fit rounded-lg "
                            >
                              Charles Brown
                              <button className="mx-2 text-iota text-3xl">
                                {" "}
                                <IoCloseSharp />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-[50%] w-full">
                    <div className="flex items-center gap-2 my-5">
                      <Calendar />
                      <h2 className="font-bold  text-headingColor md:text-[1.6rem] text-base">
                        End-of-day email alerts
                      </h2>
                    </div>
                    <div className="flex gap-5 md:gap-2 my-5">
                      <input
                        required
                        name="first-name"
                        type="text"
                        className="rounded-full border h-fit border-blueColor outline-none w-full  py-1 px-3"
                        placeholder="Add keywords here"
                      />
                      <button
                        type="submit"
                        className="py-1 px-5 w-fit  h-fit  bg-blueColor  rounded-full font-semibold border-transparent border-2 text-white hover:blueH"
                      >
                        Add
                      </button>
                    </div>

                    <div className="bg-lightGray pr-6 rounded-xl h-fit py-5 pl-5 md:pr-7 ">
                      <div className="bg-lightGray w-full rounded-xl  customScrollbar  overflow-auto h-[30vh] md:h-[50vh]">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
                          return (
                            <div
                              key={index}
                              className="bg-white flex items-center my-5 text-bodyColor py-1 px-2 w-fit rounded-lg "
                            >
                              Charles Brown
                              <button className="mx-2 text-iota text-3xl">
                                {" "}
                                <IoCloseSharp />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quotes */}
                <div className="flex md:flex-row flex-col  md:items-center gap-5">
                  {/* right */}
                  <div className="md-w-[50%]  w-full">
                    <div className="flex items-center gap-2 my-5">
                      <Quote />
                      <h2 className="font-bold  text-headingColor md:text-[1.6rem] text-base">
                        Quote Context
                      </h2>
                    </div>

                    <p className="block mb-2 text-base text-bodyColor ">
                      Use the slider to control how many words are quoted before
                      and after each keyword in your alert emails
                    </p>
                  </div>
                  {/* left */}
                  <div className="md-w-[50%] w-full">
                    <div className="flex items-center bg-lightGray rounded-full space-x-4 px-4 py-2">
                      <span className="text-lg font-semibold">{value} </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={handleChange}
                        className="appearance-none w-full h-2 rounded-full bg-gray-200"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* reciept */}
                <div className="flex items-center gap-2 my-5">
                  <Email />
                  <h2 className="font-bold  text-headingColor md:text-[1.6rem] text-base">
                    Recipients
                  </h2>
                </div>
                <div className="flex gap-5 md:gap-2">
                  <input
                    required
                    name="first-name"
                    type="text"
                    className="rounded-full border h-fit border-blueColor outline-none w-full md:w-[40%] py-1 px-3"
                    placeholder="Enter new email address"
                  />
                  <button
                    type="submit"
                    className="py-1 px-5 w-fit  h-fit  bg-blueColor  rounded-full font-semibold border-transparent border-2 text-white"
                  >
                    Add
                  </button>
                </div>
                {/* email container */}
                <div className="flex flex-wrap gap-2 bg-lightGray md:p-10 p-5 rounded-2xl w-full my-5">
                  {emails.map((email, index) => (
                    <div
                      className="bg-white flex items-center rounded-md py-1 px-2"
                      key={index}
                    >
                      {email}
                      {/* set close icon */}
                      <button className="mx-2 text-iota text-3xl">
                        {" "}
                        <IoCloseSharp />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="block mb-2 text-base text-bodyColor ">
                  Changes made above are not saved until you confirm with "save
                  changes" button
                </p>
                <div className="flex flex-col md:flex-row gap-5 my-5">
                  <button
                    type="submit"
                    className="py-2 px-5 w-fit  h-fit  bg-blueColor  rounded-full font-semibold border-transparent border-2 text-white"
                  >
                    Save changes
                  </button>
                  <button className="py-2 px-5 w-fit  h-fit  border-blueColor  font-semibold  border-2 rounded-full text-blueColor">
                    Revert
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}