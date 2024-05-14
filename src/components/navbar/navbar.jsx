"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  if (pathName === "/") {
    return null; // Retorna null si el pathName es "/"
  }

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between'>
          <div>
            <a href='/' passHref>
              <p className='text-white hover:text-yellow-500'>Exit</p>
            </a>
          </div>
          <div className='flex space-x-4'>
            <a href='/characters' passHref>
              <p className='text-white hover:text-yellow-500'>Characters</p>
            </a>
            <a href='/movies' passHref>
              <p className='text-white hover:text-yellow-500'>Movies</p>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
