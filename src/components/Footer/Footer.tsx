import React from "react";
import Logo from "../Icons/Logo";

export default function Footer() {
  return (
    <div className="bg-bodyColor font-Manrope py-5 text-white px-6 md:px-10 lg:px-24 mt-5">
      <footer className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 justify-center items-start py-5">
        <div className="flex flex-col gap-4">
         <Logo/>
        </div>
      </footer>
      <hr className="w-[100%] border-white mb-5 border-opacity-15" />
      <div className="flex md:flex-row flex-col justify-between gap-5">
        <div className="text-sm text-white">
          <a href="#" className="underline hover:no-underline">
            Privacy Policy
          </a>
          <a href="#" className="ml-3 underline hover:no-underline">
            Terms of Use
          </a>
        </div>
        <p className="text-sm text-white">
          © 2024 PoliAlerts. All rights reserved.
        </p>
      </div>
    </div>
  );
};
