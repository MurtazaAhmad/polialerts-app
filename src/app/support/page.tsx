import FAQ from "@/components/FAQ/FAQ";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function Support() {
  return (
    <div>
      <Navbar />
      <div className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:py-10   md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center">
        <h2 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem] ">
          Support
        </h2>
      </div>

      <div className="lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5">
        <hr className="w-[100%] lg:border-iota" />
      </div>

      <div className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:pt-10">
        <h3 className="text-headingColor font-bold md:text-[2.1rem] text-[1.6rem]">
          Frequently asked questions
        </h3>
        <FAQ />
      </div>

      <section className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:py-10  md:gap-5 gap-5 md:flex-row flex-col flex md:justify-between md:items-start">
        <h3 className="text-headingColor font-bold md:text-[2.1rem] text-[1.6rem] md:w-[40%]">
          Contact us
        </h3>

        <div className="md:w-[70%] flex flex-col">
          <p className="text-bodyColor md:text-base text-sm">
            Need more support? Send us a message and a member of our team will
            reach out to help.
          </p>
          <form>
          <textarea  className="rounded-xl w-full mt-5 px-3 border border-blueColor" name="message" id="message"></textarea>
          <button
                type="submit"
                className=" mt-5 py-2 px-6 w-fit  h-fit  bg-blueColor hover:bg-blueHover rounded-full font-semibold border-transparent border-2 text-white"
              >
                Submit
              </button>
          </form>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
