import Footer from "@/components/Footer/Footer";
import Eye from "@/components/Icons/Eye";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import React from "react";

export default function Login() {
  

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
                  <Eye/>
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