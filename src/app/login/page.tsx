"use client";
import Footer from "@/components/Footer/Footer";
import Eye from "@/components/Icons/Eye";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();
  const [signInWithEmailAndPassword, user, loadingFirebase, error] = useSignInWithEmailAndPassword(auth);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        sessionStorage.setItem('user', JSON.stringify(res.user)); // Use JSON.stringify if you are storing an object
        setEmail('');
        setPassword('');
        toast.success("Logged in successfully!");
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000); // Short delay for success message
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <section className="font-Manrope flex flex-col justify-center items-center my-16">
        <div className="xl:w-[35%] lg:w-[40%] md:w-[50%] w-[90%] rounded-xl mx-auto bg-lightGray">
          <div className="md:p-16 p-10">
            <h1 className="text-headingColor font-bold md:text-[3rem] text-[2.3rem]">
              Log in
            </h1>
            <form onSubmit={handleFormSubmit}>
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
                    disabled={loading}
                    aria-label="Email"
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
                      disabled={loading}
                      aria-label="Password"
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-2 cursor-pointer"
                    >
                      <Eye passwordVisible={passwordVisible} />
                    </div>
                  </div>
                  <Link
                    className="text-blueColor underline font-semibold w-fit text-base hover:no-underline hover:text-blueHover"
                    href="/"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="flex my-2 justify-start rounded-full w-fit py-2 px-10 bg-blueColor text-white hover:bg-blueHover"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                {errorMessage && (
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="text-sm font-semibold mx-auto text-center my-5">
          <span className="text-bodyColor">Don&apos;t have an account?</span>
          <span className="text-blueColor ml-1">
            <Link
              className="underline hover:no-underline hover:text-blueHover"
              href="/signup"
            >
              Sign up
            </Link>
          </span>
        </div>
      </section>
      <Footer />
    </div>
  );
}
