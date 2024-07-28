"use client";
import Footer from "@/components/Footer/Footer";
import Eye from "@/components/Icons/Eye";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

interface Props {}

const Signup = (props: Props) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Calling Hook - Returns array
  {
    /*} const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, password);

        try {

            const res = await createUserWithEmailAndPassword(email, password)
            console.log("res: ", res);
            // const user = userCredential?.user
            // console.log(user)

        } catch (error: any) {
            console.log("ERROR!");
            console.log(error.message)
        }

    }*/
  }

  return (
    <>
      <Navbar />
      <section className="font-Manrope flex flex-col justify-center items-center my-16">
        <div className="xl:w-[35%] lg:w-[40%] md:w-[50%] w-[90%] rounded-xl mx-auto bg-lightGray">
          <div className="md:p-16 p-10">
            <h1 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem]">
             Sign up
            </h1>
            <form>
              <div className="flex flex-col gap-3">
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
      <Footer />
    </>
  );
};

export default Signup;
