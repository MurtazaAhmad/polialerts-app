"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <Navbar />
      <section className="font-Manrope flex flex-col justify-center items-center my-16">
        <div className="xl:w-[35%] lg:w-[40%] md:w-[50%] w-[90%] rounded-xl mx-auto bg-lightGray">
          <div className="md:p-16 p-10">
            <h1 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem]">
              Log in
            </h1>
            <div className="flex flex-col gap-3">
              <div>
                <label
                  className="block text-[1.1rem] mt-4 mb-2 text-bodyColor"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="rounded-full w-full py-2 outline-none px-3 border-blueColor border"
                  name="email"
                  id="email"
                  type="email"
                />
              </div>
              <div>
                <label
                  className="block text-[1.1rem] mt-4 mb-2 text-bodyColor"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="rounded-full relative w-full border-blueColor border mb-3">
                  <input
                    className="w-full rounded-full outline-none py-2 px-3"
                    name="password"
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                  />
                  <svg
                    className="absolute top-[0.5rem] z-[10] p-[5px] right-2 rounded-full bg-lightGray cursor-pointer"
                    width="28"
                    height="28"
                    onClick={togglePasswordVisibility}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <defs>
                      <style>
                        {`.cls-1 { fill: #6f6f6f; stroke-width: 0px; }`}
                      </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id={passwordVisible ? "view" : "hide"}>
                        {passwordVisible ? (
                          <>
                            <path
                              className="cls-1"
                              d="M502.6,232.5c-41.5-40.6-136.3-119.6-246.6-119.6S50.8,191.9,9.4,232.5c-12.6,12.3-12.6,34.7,0,47,41.4,40.6,136.3,119.6,246.6,119.6s205.1-79,246.6-119.6c12.5-12.3,12.5-34.7,0-47ZM256,359.2c-57,0-103.2-46.2-103.2-103.2s46.2-103.1,103.2-103.1,103.1,46.1,103.1,103.1-46.2,103.1-103.1,103.2Z"
                            />
                            <circle
                              className="cls-1"
                              cx="256"
                              cy="256"
                              r="72.1"
                            />
                          </>
                        ) : (
                          <>
                            <path
                              className="cls-1"
                              d="M502.6,223.3c-41.5-40.6-136.3-119.6-246.6-119.6-25.8.2-51.4,4.2-76,12l36.1,36.1c52.5-22,113,2.7,135,55.2,10.7,25.5,10.7,54.3,0,79.9l56.9,56.9c41.3-24.5,74.3-53.5,94.6-73.4,12.5-12.4,12.5-34.8,0-47.1h0Z"
                            />
                            <path
                              className="cls-1"
                              d="M256,174.7c-5.2,0-10.3.6-15.4,1.6l85.9,85.9c8.5-38.9-16.2-77.4-55.2-85.9-5-1.1-10.1-1.6-15.3-1.6h0Z"
                            />
                            <path
                              className="cls-1"
                              d="M73.5,63.4c-9.6-9.6-25.1-9.6-34.7,0-9.6,9.6-9.6,25.1,0,34.7l57,56.9c-37.5,23.4-67.5,49.9-86.4,68.4-12.6,12.3-12.6,34.7,0,47,41.4,40.5,136.3,119.5,246.6,119.5,22.2-.1,44.3-3.1,65.8-9l67.7,67.7c9.6,9.6,25.1,9.6,34.7,0s9.6-25.1,0-34.7L73.5,63.4ZM256,350c-57,0-103.2-46.2-103.1-103.2,0-10.2,1.5-20.4,4.5-30.2l26.6,26.6c-.1,1.2-.1,2.5-.1,3.7,0,39.8,32.3,72.1,72.1,72.1s2.5,0,3.7-.1l26.6,26.6c-9.8,2.9-20,4.5-30.3,4.5h0Z"
                            />
                          </>
                        )}
                      </g>
                    </g>
                  </svg>
                </div>
                <Link
                  className="text-blueColor underline font-semibold w-fit text-base hover:no-underline hover:text-blueHover"
                  href="/"
                >
                  Forgot Password?
                </Link>
              </div>
              <button className="flex my-2 justify-start rounded-full w-fit py-2 px-10 bg-blueColor text-white hover:bg-blueHover">
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="text-sm font-semibold mx-auto text-center my-5">
        <span className="text-bodyColor">Don't have an account?</span>
        <span className="text-blueColor ml-1"><Link className="underline hover:no-underline hover:text-blueHover" href="/">Contact us</Link></span>
      </div>
      </section>
      <Footer/>
    </div>
  );
}