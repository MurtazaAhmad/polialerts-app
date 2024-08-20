"use client";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Navbar from "@/components/Navbar/Navbar";
import CoverageAreaModel from "@/components/Dashboard/CoverageAreaModel";
import CoverageArea from "@/components/Dashboard/CoverageArea";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCategory } from "@/hooks/useCategory";

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
    deleteChannel
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />

      {/* Header */}
      <div className="font-Manrope lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5 py-5 md:py-10   md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center">
        <div>
          <h2 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem] ">
            Your alerts{" "}
            <span className="text-blueColor text-base uppercase">pro plan</span>
          </h2>
          <p className="text-base text-bodyColor">
            Welcome, {userDetails?.name}
          </p>
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 px-7 py-1 w-fit h-fit bg-blueColor hover:bg-blueHover rounded-full font-semibold border-transparent border-2 text-white flex items-center"
          >
            <span className="font-semibold mr-3 text-3xl">+</span>
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

      <div className="lg:pl-24 lg:pr-[4.70rem] md:px-10 px-5">
        <hr className="w-[100%] lg:border-iota" />
      </div>

      {userDetails?.channels && Object.entries(userDetails.channels).length > 0 ? (
        Object.entries(userDetails.channels).map(([channelId, channel]) => (
          <CoverageArea
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
        <div className="text-base text-bodyColor my-5 leading-[1.625rem]">
          You do not have any alerts set up. Get started by adding a new coverage area.
        </div>
      )}
    </div>
  );
}
