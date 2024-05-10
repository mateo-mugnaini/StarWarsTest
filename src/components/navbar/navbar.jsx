"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathName = usePathname();

  if (pathName === "/characters" || pathName === "/movies") {
    return (
      <div>
        <Link href='/'>Back to home</Link>
      </div>
    );
  }
};

export default Navbar;
