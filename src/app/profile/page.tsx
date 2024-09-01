"use client";
import BillingInfo from "@/components/Profile/BillingInfo";
import PersonalInfo from "@/components/Profile/PersonalInfo";
import PlanDetails from "@/components/Profile/PlanDetails";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useUser } from "@/hooks/useUser";
import React, { useEffect } from "react";

export default function Profile() {
  const [user] = useAuthState(auth);
  const { userDetails, fetchUser, loading, error, updateProfile} = useUser();

  useEffect(() => {
    console.log("useEffect Called");

    if (user) {
      console.log("We have a User", user);
      fetchUser(user.uid);
    }
  }, [user]);

  if (loading || !userDetails) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:py-10  md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center">
        <h1 className="text-headingColor font-bold md:text-5xl md:leading-[4rem] text-[2.375rem] leading-[3.25rem] ">
          Your Profile
        </h1>
        <button className="py-2 px-5 w-fit text-base h-fit uppercase border-blueColor  font-semibold  border-2 rounded-xl text-blueColor">
          {userDetails?.subscription_type} plan
        </button>
      </div>

      <div className="lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5">
        <hr className="w-[100%] border-iota" />
      </div>

      <PersonalInfo userDetails={userDetails} updateProfile={updateProfile}/>
      <BillingInfo />
      <PlanDetails />
    </>
  );
}
