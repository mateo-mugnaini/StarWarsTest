"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathName = usePathname();

  if (pathName === "/") {
    return null; // Retorna null si el pathName es "/"
  }

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <Link href='/characters' passHref>
              <p className='text-white hover:text-gray-300'>Characters</p>
            </Link>
            <Link href='/movies' passHref>
              <p className='text-white hover:text-gray-300'>Movies</p>
            </Link>
          </div>
          {pathName === "/characters" || pathName === "/movies" ? (
            <div>
              <Link href='/' passHref>
                <p className='text-white hover:text-gray-300'>Back to Home</p>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
