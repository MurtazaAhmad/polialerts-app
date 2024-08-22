import React from "react";
import CancelPlanModal from "@/components/Profile/CancelPlanModal";

export default function PlanDetails() {
  return (
    <div>
      <section className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:py-10  md:gap-5 gap-5 md:flex-row flex-col flex md:justify-between md:items-start">
        <h2 className="text-headingColor font-bold md:text-[2.125rem] text-[1.875rem] md:leading-[3rem] leading-[1.875rem] md:w-[40%]">
          Plan Details
        </h2>

        <div className="md:w-[70%]">
          <section className="grid md:grid-cols-2 grid-cols-1 gap-x-5 gap-5 md:gap-y-10">
            <section>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor mb-2">Plan type</p>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">Pro</p>
            </section>

            <section>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor mb-2">Plan term</p>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">
                06-22-2024 until 06-22-2025
              </p>
            </section>

            <section>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor mb-2">Plan prices</p>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">$999.00 per month plus applicable taxes</p>
            </section>

            <section>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor mb-2">Billing cycle</p>
              <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">
               Every month of the 22nd day
              </p>
            </section>
          </section>
          

          <section className="mt-5 grid md:grid-cols-2 grid-cols-1  md:gap-y-10 gap-5 mb-5">
            <CancelPlanModal/>
          </section>
        </div>
      </section>
    </div>
  );
};
