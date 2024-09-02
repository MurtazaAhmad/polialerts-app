"use client";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import CoverageAreaModel from "@/components/Dashboard/CoverageAreaModel";
import CoverageArea from "@/components/Dashboard/CoverageArea";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCategory } from "@/hooks/useCategory";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  // Auth User
  const [user] = useAuthState(auth); //user variable

  //Auth User Session
  let userSession = null;
  if (typeof window !== "undefined") {
    userSession = sessionStorage.getItem("user");
  }

  //Router
  const router = useRouter();

  // If user not logged In (User session not found) - Logout
  //
  if (!user && !userSession) {
    router.push("/login");
  }

  //  const { data, loading: isLoading, addItem, updateItem, deleteItem } = useDatabase(mockDatabaseService, 'Users');
  //  console.log("data using 571st approach", data);

  const {
    mainCategories,
    subCategories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchMainCategories,
    fetchSubCategories,
  } = useCategory();
  //Approach 1.
  const {
    addChannel,
    userDetails,
    fetchUser,
    loading,
    error,
    addRealTimeAlertKeyword,
    addReportAlertKeyword,
    getChannels,
    updateChannel,
    deleteChannel,
  } = useUser();
  console.log("userDetails: ", userDetails);
  if (userDetails)
    console.log("channels: ", Object.entries(userDetails.channels));

  useEffect(() => {
    console.log("useEffect Called");

    if (user) {
      console.log("We have a User", user);
      fetchUser(user.uid);
    }

    // fetchCategories (root)
    fetchMainCategories("root");
  }, [user]);

  if (loading || !userDetails) {
    return <div className="mb-64">Loading...</div>;
  }

  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <div>
    
    <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <div className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:py-10   md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center">
        <div>
          <h1 className="text-headingColor font-bold md:text-5xl md:leading-[4rem] text-[2.375rem] leading-[3.25rem] ">
            Your alerts{" "}
            <span className="text-blueColor text-sm leading-[1.375rem] md:text-base md:leading-7 uppercase">
              {userDetails.subscription_type === "PRO" && "Pro Plan"}
              {userDetails.subscription_type === "PLUS" && "Plus Plan"}
              {userDetails.subscription_type === "BUDGET" && "Budget Plan"}
            </span>
          </h1>
          <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">
            Welcome, {userDetails?.firstName} {userDetails?.lastName}!{" "}
          </p>
        </div>
        <div>
          <button type="submit">
            <span>
              <CoverageAreaModel
                addChannel={addChannel}
                fetchUser={fetchUser}
                userDetails={userDetails}
                mainCategories={mainCategories}
                subCategories={subCategories}
                fetchSubCategories={fetchSubCategories}
              />
            </span>
          </button>
        </div>
      </div>

      {userDetails.subscription_type === "BUDGET" && (
        <div className="lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 pb-10">
          <div className="bg-yellowish p-4 rounded-lg ">
            <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">
              Your plan includes end-of-day email alerts for up to 3 keywords in
              1 coverage area. For more keywords, coverage areas, and real-time
              email alerts,
              <a
                href=""
                className="text-blueColor font-semibold underline hover:no-underline"
              >
                upgrade your plan
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {userDetails.subscription_type === "PLUS" && (
        <div className="lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 pb-10">
          <div className="bg-yellowish p-4 rounded-lg ">
            <p className="text-sm leading-[1.375rem] md:text-base md:leading-7 text-bodyColor">
              Your plan includes end-of-day email alerts for up to 10 keywords
              in 2 coverage areas. For more keywords, coverage areas, and
              real-time email alerts,
              <a
                href=""
                className="text-blueColor font-semibold underline hover:no-underline"
              >
                upgrade your plan
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div className="lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5">
        <hr className="w-[100%] border-iota" />
      </div>

      {userDetails?.channels &&
        Object.entries(userDetails.channels).length > 0 ? (
        Object.entries(userDetails.channels).map(([channelId, channel]) => (
          <CoverageArea
            subscriptionType={userDetails?.subscription_type}
            channel={channel}
            key={channelId}
            channelId={channelId}
            updateChannel={updateChannel}
            deleteChannel={deleteChannel}
            userDetails={userDetails}
            fetchUser={fetchUser}
          />
        ))
      ) : (
        <div className="mb-64 text-sm md:text-base md:leading-7 text-bodyColor my-5 leading-[1.625rem] lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5">
          You do not have any alerts set up. Get started by adding a new
          coverage area.
        </div>
      )}
    </div>
  ); 
}
