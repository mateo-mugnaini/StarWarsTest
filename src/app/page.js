"use client";
import React, { useRef } from "react";
import Image from "next/image";
import ImagenTitle from "@/../public/Titles/SW_Title.png";
import HomeBtn from "./components/homeBtns";

const Home = () => {
  const buttonRef = useRef(null);

  const handleClick = () => {
    buttonRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className='container h-screen flex flex-col justify-center items-center -ml-40 mt-20'>
        <Image src={ImagenTitle} alt='Star Wars' width={400} height={200} />
        <div
          className='mt-16 p-3 rounded-2xl border-2 border-yellow-300 hover:border-yellow-500 cursor-pointer'
          onClick={handleClick}>
          <p className='font-play'>May the Force be with you</p>
        </div>
      </div>
      <div
        ref={buttonRef}
        className='flex h-screen w-full flex items-center justify-start gap-16 px-40 py-96'>
        <HomeBtn />
      </div>
    </div>
  );
};

export default Home;
