"use client";
import Footer from "@/components/Footer/Footer";
import Eye from "@/components/Icons/Eye";
import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import { toast, Toaster } from "react-hot-toast";


import { auth } from "@/app/firebase/config";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { createUser } = useUser();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Calling Hook - Returns array
  const [createUserWithEmailAndPassword, user, loading, createUserError] = useCreateUserWithEmailAndPassword(auth)
  const [sendEmailVerification, sending, emailVerificationError] = useSendEmailVerification(
    auth
  );

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email, password);

    try {

      const res = await createUserWithEmailAndPassword(email, password)
      console.log("response: ", res);

      // Check if response has an error
      if (createUserError) {
        console.log("Error: ", createUserError.message);
        return;
      }

      // Using User ID from response, we can store user data in Firestore on Users Collection
      const user = res?.user
      console.log("user", user);
      const userId: string | undefined = user?.uid
      console.log("userId", userId);

      // Send Email Verification
      const status = await sendEmailVerification()

      console.log("Email Verification Status: ", status);

      // Something went wrong
      if (!userId) return;

      // Add user to localstorage
      localStorage.setItem('userRegistration', JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
      }));

      /*
      await createUser({
        id: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      */

      console.log("Account Created Successfully!");

      toast.success("A verification link has been sent to your Email!");

      setTimeout(() => {
        // Navigate to Login
        router.push('/login');
      }
        , 2000);


    } catch (error: any) {
      console.log("ERROR!");
      console.log(error.message)
    }
  }

  if (emailVerificationError) {
    console.log("Email Verification Error: ", emailVerificationError.message);
  }

  if (createUserError) {
    console.log("Create User Error: ", createUserError.message);
  }

  if (sending) {
    console.log("Sending Email Verification...");
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="font-Manrope flex flex-col justify-center items-center my-16">
        <div className="xl:w-[35%] lg:w-[40%] md:w-[50%] w-[90%] rounded-xl mx-auto bg-lightGray">
          <div className="md:p-16 p-10">
            <h1 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem]">
              Sign up
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-3">
                <div>
                  <label
                    className="block text-[1.1rem] mt-4 mb-2 text-bodyColor"
                    htmlFor="first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="rounded-full w-full py-2 outline-none px-3 border-blueColor border"
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-[1.1rem] mt-4 mb-2 text-bodyColor"
                    htmlFor="name"
                  >
                    Last Name
                  </label>
                  <input
                    className="rounded-full w-full py-2 outline-none px-3 border-blueColor border"
                    id="name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-[1.1rem] mt-4 mb-2 text-bodyColor"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="rounded-full w-full py-2 outline-none px-3 border-blueColor border"
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-[1.1rem] mt-4 mb-2 text-bodyColor"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="rounded-full relative w-full border mb-3">
                    <input
                      className="rounded-full w-full py-2 outline-none px-3 border-blueColor border"
                      name="password"
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div onClick={togglePasswordVisibility}>
                      <Eye passwordVisible={passwordVisible} />
                    </div>
                  </div>
                </div>
                <button className="flex my-2 justify-start rounded-full w-fit py-2 px-10 bg-blueColor text-white hover:bg-blueHover">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

      </section>
    </>
  );
};

export default Signup;
