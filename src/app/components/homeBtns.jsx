import React from "react";
import Image from "next/image";
import CharacterIcon from "@/../public/characters/characterIcon.jpg";
import MoviesIcon from "@/../public/movies/moviesIcon.webp";

const HomeBtn = () => {
  return (
    <>
      <a
        href='/characters'
        className='w-[300px] h-[300px] border-2 border-yellow-300 rounded-2xl flex flex-col items-center justify-center p-4 text-center shadow-md border-4 hover:border-yellow-500 hover:text-blue-500 cursor-pointer'>
        <div className='flex flex items-center justify-center'>
          <Image
            src={CharacterIcon}
            alt=''
            width={200}
            height={200}
            className='w-[200px] h-[200px] object-cover'
          />
        </div>
        <p className='mt-3 font-bold text-xl'>Characters</p>
      </a>
      <a
        href='/movies'
        className='w-[300px] h-[300px] border-2 border-yellow-300 rounded-2xl flex flex-col items-center justify-center p-4 text-center shadow-md border-4 hover:border-yellow-500 hover:text-red-500 cursor-pointer'>
        <div className='flex flex items-center justify-center '>
          <Image
            src={MoviesIcon}
            alt=''
            width={200}
            height={200}
            className='w-[200px] h-[200px] object-cover'
          />
        </div>
        <p className='mt-3 font-bold text-xl'>Movies</p>
      </a>
    </>
  );
};

export default HomeBtn;
