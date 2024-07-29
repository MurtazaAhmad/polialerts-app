import React from "react";
export default function BillingInfo() {
  return (
    <section className="font-Manrope lg:mx-28 md:mx-14 mx-5 py-5 md:py-10  md:gap-5 gap-5 md:flex-row flex-col flex md:justify-between md:items-start">
      <h3 className="text-headingColor font-bold md:text-[2.1rem] text-[1.6rem] md:w-[40%]">
        Billing Information
      </h3>

      <div className="md:w-[70%]">
        <section className="grid md:grid-cols-2 grid-cols-1  gap-x-5 md:gap-y-10 gap-5">
          <section>
            <p className="text-base text-bodyColor mb-2">
              Amount of last payment
            </p>
            <p className="text-base text-bodyColor">$1148.85</p>
          </section>

          <section>
            <p className="text-base text-bodyColor mb-2">
              Date of last payment
            </p>
            <p className="text-base text-bodyColor">07-22-2024</p>
          </section>
        </section>

        <section className="grid md:grid-cols-2 grid-cols-1  md:gap-y-10 gap-5 mb-10">
          <button
            type="submit"
            className="mt-5 py-2 px-5 w-fit  h-fit  bg-blueColor hover:bg-blueHover rounded-full font-semibold border-transparent border-2 text-white"
          >
            Manage payment method
          </button>
        </section>
      </div>
    </section>
  );
}
