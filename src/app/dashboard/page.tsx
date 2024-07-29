"use client";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Navbar from "@/components/Navbar/Navbar";
import CoverageAreaModel from "@/components/Dashboard/CoverageAreaModel";
import CoverageArea from "@/components/Dashboard/CoverageArea";

export default function Dashboard() {
 
    const [value, loading, error] = useCollection(collection(db, 'government_levels'))
    const governmentLevels = value?.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }))

    console.log("governmentLevels2", governmentLevels);
  
  return (
    <div>
      <Navbar />

      {/* Header */}
      <div className="font-Manrope lg:mx-28  md:mx-14 mx-5 py-5 md:py-10 border-b  border-b-iota  md:gap-5 gap-5 flex-col md:flex-row flex md:justify-between md:items-center">
        <div>
          <h2 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem] ">
            Your alerts{" "}
            <span className="text-blueColor text-base uppercase">pro plan</span>
          </h2>
          <p className="text-base text-bodyColor">Welcome, John Smith</p>
        </div>

        <div>
          <button
            type="submit"
            className="mt-5 px-7 py-1 w-fit h-fit bg-blueColor hover:bg-blueHover rounded-full font-semibold border-transparent border-2 text-white flex items-center"
          >
            <span className="font-semibold mr-3 text-3xl">+</span>
            <span>
              {" "}
              <CoverageAreaModel />
            </span>
          </button>
        </div>
      </div>
      <CoverageArea/>
    </div>
  );
}
