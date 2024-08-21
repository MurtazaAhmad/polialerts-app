import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import BillingInfo from "@/components/Profile/BillingInfo";
import PersonalInfo from "@/components/Profile/PersonalInfo";
import PlanDetails from "@/components/Profile/PlanDetails";
import React from "react";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:py-10  md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center">
        <h1 className="text-headingColor font-bold md:text-5xl md:leading-[4rem] text-[2.375rem] leading-[3.25rem] ">
          Your Profile
        </h1>
        <button className="py-2 px-5 w-fit text-base h-fit uppercase border-blueColor  font-semibold  border-2 rounded-xl text-blueColor">
          pro plan
        </button>
      </div>

      <div className="lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5">
        <hr className="w-[100%] border-iota" />
      </div>

      <PersonalInfo />
      <BillingInfo />
      <PlanDetails />
      <Footer />
    </>
  );
}
