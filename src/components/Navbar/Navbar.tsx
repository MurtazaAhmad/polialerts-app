"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Icons/Logo";
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config'
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      alert('Logged Out');
      sessionStorage.removeItem('user');
      router.push('/login');
    }
  };

  return (
    <>
      <header className="font-Manrope">
        <nav
          className="
            lg:px-24  md:px-10 px-5 py-5
            flex flex-wrap
            items-center
            justify-between
            w-full
            bg-bodyColor
          "
        >
          <div>
            <a href="#">
              <Logo />
            </a>
          </div>
          <svg
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <div
            className={`${isMenuOpen ? "block" : "hidden"} w-full md:flex md:items-center md:w-auto`}
            id="menu"
          >
            <ul
              className="
                pt-4
                text-white text-base font-semibold
                md:flex
                md:justify-between 
                md:pt-0
              "
            >
              <li>
                <Link href="/dashboard">
                  <p className="md:p-4 py-2 block hover:underline active:underline">
                    Dashboard
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <p className="md:p-4 py-2 block hover:underline active:underline">
                    Profile
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <p className="md:p-4 py-2 block hover:underline active:underline">
                    Support
                  </p>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="md:p-4 py-2 block hover:underline active:underline text-left"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
