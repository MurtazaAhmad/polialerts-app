"use client";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../firebase/config";
import { UserService } from "@/services/UserService";
import { UserRepository } from "@/repositories/UserRepository";
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
import { useUser } from "@/hooks/useUser";
import useDatabase from '@/hooks/useDatabase';

import { useRouter } from "next/navigation";
import { useCategory } from "@/hooks/useCategory";

export default function Dashboard() {

  // Auth User
  const [user] = useAuthState(auth);

  //Auth User Session
  const userSession = sessionStorage.getItem('user');

  //Router
  const router = useRouter();

  // If user not logged In (User session not found) - Logout
  // 
  if (!user && !userSession) {
    router.push("/login");
  }

  //  const { data, loading: isLoading, addItem, updateItem, deleteItem } = useDatabase(mockDatabaseService, 'Users');
  //  console.log("data using 571st approach", data);

  const { mainCategories, loading: categoriesLoading, error: categoriesError, fetchMainCategories, fetchSubCategories } = useCategory();
  //Approach 1.
  const { userDetails, fetchUser, loading, error } = useUser();
  console.log("users - Approach 1", userDetails);

  useEffect(() => {
    console.log("useEffect Called");

    if (user) {
      console.log("We have a User", user);
      fetchUser("ssSeZ9GE9cdr4LckPFIZ");
    }

    // fetchCategories (root)
    fetchMainCategories("root");

  }, [user])

  //Approach 2.
  /*
  useEffect(() => {
    const fetchUsers = async () => {
      const userRepository = new UserRepository();
      const userService = new UserService(userRepository);
      try {
        const users = await userService.getUsers();
        // setUsers(users);
        console.log("users - Approach 2", users);
      } catch (error) {
        // setError("Failed to fetch users.");
        console.log("Failed to fetch");
      } finally {
        // setLoading(false);
        console.log("Is loading - false");
      }
    };

    fetchUsers();
  }, []);
  */

  // const [value, loading, error] = useCollection(collection(db, 'government_levels'))
  // const governmentLevels = value?.docs.map(doc => ({
  //   id: doc.id,
  //   data: doc.data()
  // }))

  // const [value2, loading2, error2] = useCollection(collection(db, 'Users'))
  // const users = value2?.docs.map(doc => ({
  //   id: doc.id,
  //   data: doc.data()
  // }))

  // console.log("users", users);
  //const userService = new UserService(new UserRepository());

  /*
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getUsers();
      console.log("users", users);

    };

    fetchUsers();
  }, [userService]);
  */

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

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
          <p className="text-base text-bodyColor">Welcome, {userDetails?.name}</p>
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 px-7 py-1 w-fit h-fit bg-blueColor hover:bg-blueHover rounded-full font-semibold border-transparent border-2 text-white flex items-center"
          >
            <span className="font-semibold mr-3 text-3xl">+</span>
            <span>
              {" "}
              <CoverageAreaModel mainCategories={mainCategories} />
            </span>
          </button>
        </div>
      </div>
      <CoverageArea />
    </div>
  );
}
