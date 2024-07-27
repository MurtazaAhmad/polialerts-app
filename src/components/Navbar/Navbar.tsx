"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Icons/Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuItems = [
    { id: 1, title: "Dashboard", href: "#" },
    { id: 2, title: "Profile", href: "#" },
    { id: 3, title: "Support", href: "#" },
    { id: 4, title: "Log out", href: "#" },
  ];
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
            className={` ${
              isMenuOpen === true ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto`}
            id="menu"
          >
            <ul
              className="
        pt-4
        text-white text-base font-semibold
        md:flex
        md:justify-between 
        md:pt-0"
            >
              {menuItems.map((item, index) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <p className="md:p-4 py-2 block hover:underline active:underline">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
